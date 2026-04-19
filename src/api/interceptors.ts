// src/api/interceptors.ts
// Skeletons. Real behaviour lands in Phase B with auth.
//
// - addAuthHeader: inject bearer token from the auth token store.
// - refreshOn401: on 401, attempt a silent refresh and retry the request.
//
// TODO(arch §10.3, §10.4): wire these to `src/auth/tokenStore.ts` and the
// auth state machine once that exists.

export async function addAuthHeader(_headers: Record<string, string>): Promise<void> {
  // No-op in Phase A. Phase B will read from src/auth/tokenStore.
}

export async function refreshOn401<T>(_opts: unknown): Promise<T | null> {
  // No-op in Phase A — always signals "no retry". Phase B will implement
  // rotate-and-retry semantics per arch §10.4.
  return null;
}
