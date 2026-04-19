// src/types/api.ts
// API boundary types. In practice most types are inferred from Zod schemas
// in src/api/schemas/ — this file is a place to hang request/response
// primitives that aren't schema-derivable.

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// TODO(Phase B): add Paginated<T>, Envelope<T>, etc. once backend shape
// is confirmed (OQ-1).
