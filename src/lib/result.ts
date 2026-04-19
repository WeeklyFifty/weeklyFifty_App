// src/lib/result.ts
// Minimal Result type. Arch §2 principle 6 ("fail clearly, not loudly").
// Use anywhere a function can fail in a caller-actionable way without
// throwing.

export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

export function ok<T, E = Error>(value: T): Result<T, E> {
  return { ok: true, value };
}

export function err<T, E = Error>(error: E): Result<T, E> {
  return { ok: false, error };
}

export function isOk<T, E>(r: Result<T, E>): r is { ok: true; value: T } {
  return r.ok;
}

export function isErr<T, E>(r: Result<T, E>): r is { ok: false; error: E } {
  return !r.ok;
}
