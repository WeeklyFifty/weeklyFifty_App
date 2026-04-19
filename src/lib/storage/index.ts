// src/lib/storage/index.ts
//
// NOTE: Arch §5.2 bans barrel `index.ts` re-exports. This file is a
// *deliberate exception* (decision D3 in the scaffold plan). The arch doc's
// own code examples (§13.2) import `mmkvStorage` from `@/lib/storage`, so
// we ship a minimal barrel that preserves those import paths without
// duplicating code. Do NOT add re-exports to this file beyond the three
// tokens already listed.

export { storage, mmkvStorage } from "./kvStore";
export { secureStore } from "./secureStore";
