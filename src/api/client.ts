// src/api/client.ts
// Arch §9.1 functional skeleton. All responses are schema-parsed at the
// boundary. Auth header + 401 refresh are delegated to interceptors, which
// are no-ops until Phase B wires real token handling.

import type { ZodSchema } from "zod";

import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

import { ApiError, normalizeError } from "./errors";
import { addAuthHeader, refreshOn401 } from "./interceptors";

export interface RequestOptions<T> {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  schema: ZodSchema<T>;
  signal?: AbortSignal;
  authenticated?: boolean;
  timeoutMs?: number;
}

export async function apiRequest<T>(opts: RequestOptions<T>): Promise<T> {
  const {
    method = "GET",
    path,
    query,
    body,
    schema,
    signal,
    authenticated = true,
    timeoutMs = 15_000,
  } = opts;

  const base = env.EXPO_PUBLIC_API_BASE_URL || "http://localhost";
  const url = new URL(path.replace(/^\//, ""), base.endsWith("/") ? base : base + "/");
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(new DOMException("timeout", "AbortError")),
    timeoutMs,
  );
  if (signal) {
    signal.addEventListener("abort", () => controller.abort(signal.reason));
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (authenticated) await addAuthHeader(headers);

  const init: RequestInit = { method, headers, signal: controller.signal };
  if (body !== undefined) init.body = JSON.stringify(body);

  const t0 = Date.now();
  try {
    const res = await fetch(url.toString(), init);
    logger.breadcrumb({
      category: "http",
      message: `${method} ${path} ${res.status} ${Date.now() - t0}ms`,
    });

    if (res.status === 401 && authenticated) {
      const retried = await refreshOn401<T>(opts);
      if (retried !== null) return retried;
    }
    if (!res.ok) throw await ApiError.fromResponse(res);

    if (res.status === 204) return undefined as T;
    const json = (await res.json()) as unknown;
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      logger.error("api.parse_failed", { path, issues: parsed.error.issues });
      throw new ApiError({
        status: 0,
        code: "PARSE_ERROR",
        message: "Unexpected API response shape",
        cause: parsed.error,
      });
    }
    return parsed.data;
  } catch (e) {
    throw normalizeError(e);
  } finally {
    clearTimeout(timeout);
  }
}
