// src/api/errors.ts
// Arch §9.2 — fully functional port.

export type ApiErrorCode =
  | "NETWORK"
  | "TIMEOUT"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "SERVER"
  | "PARSE_ERROR"
  | "UNKNOWN";

export class ApiError extends Error {
  readonly status: number;
  readonly code: ApiErrorCode;
  readonly details?: unknown;

  constructor(args: {
    status: number;
    code: ApiErrorCode;
    message: string;
    details?: unknown;
    cause?: unknown;
  }) {
    super(args.message, { cause: args.cause });
    this.status = args.status;
    this.code = args.code;
    this.details = args.details;
    this.name = "ApiError";
  }

  static async fromResponse(res: Response): Promise<ApiError> {
    let body: unknown;
    try {
      body = await res.json();
    } catch {
      body = undefined;
    }
    const code: ApiErrorCode =
      res.status === 401
        ? "UNAUTHORIZED"
        : res.status === 403
          ? "FORBIDDEN"
          : res.status === 404
            ? "NOT_FOUND"
            : res.status === 409
              ? "CONFLICT"
              : res.status === 429
                ? "RATE_LIMITED"
                : res.status >= 500
                  ? "SERVER"
                  : "UNKNOWN";
    const message =
      body &&
      typeof body === "object" &&
      "message" in body &&
      typeof (body as { message?: unknown }).message === "string"
        ? (body as { message: string }).message
        : `HTTP ${res.status}`;
    return new ApiError({ status: res.status, code, message, details: body });
  }
}

export function normalizeError(err: unknown): ApiError {
  if (err instanceof ApiError) return err;
  if (err instanceof DOMException && err.name === "AbortError") {
    return new ApiError({ status: 0, code: "TIMEOUT", message: "Request timed out", cause: err });
  }
  if (err instanceof TypeError) {
    return new ApiError({ status: 0, code: "NETWORK", message: "Network unavailable", cause: err });
  }
  return new ApiError({ status: 0, code: "UNKNOWN", message: "Unknown error", cause: err });
}
