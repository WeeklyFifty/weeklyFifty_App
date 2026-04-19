// src/lib/logger.ts
// Thin console-backed logger. Sentry breadcrumb/capture wiring lands in Phase E
// (arch §14.2) — until then these are no-op-friendly console calls so feature
// code can log without knowing whether Sentry is initialised.

type Level = "info" | "warn" | "error";

interface BreadcrumbArgs {
  category: string;
  message: string;
  data?: Record<string, unknown>;
  level?: Level;
}

function write(level: Level, message: string, meta?: unknown) {
  if (!__DEV__) return; // avoid noisy console in release builds
  const fn = level === "error" ? console.error : level === "warn" ? console.warn : console.log;
  if (meta !== undefined) fn(`[${level}] ${message}`, meta);
  else fn(`[${level}] ${message}`);
}

export const logger = {
  breadcrumb(args: BreadcrumbArgs): void {
    write(args.level ?? "info", `breadcrumb(${args.category}): ${args.message}`, args.data);
    // TODO(arch §14.2): Sentry.addBreadcrumb({ category, message, data, level })
  },
  info(message: string, meta?: unknown): void {
    write("info", message, meta);
  },
  warn(message: string, meta?: unknown): void {
    write("warn", message, meta);
  },
  error(message: string, meta?: unknown): void {
    write("error", message, meta);
    // TODO(arch §14.2): Sentry.captureException if meta is an Error
  },
};
