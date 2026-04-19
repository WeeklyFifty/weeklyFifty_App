// src/entitlements/capabilities.ts
// Arch §11.4 — capability registry. Features ask for capabilities, not
// products. Adding gamesAccess in Phase 2 is a one-line change.

export type Capability = "fiftyPlusContent" | "downloadablePdf" | "gamesAccess";

const ENTITLEMENT_FOR: Record<Capability, string[]> = {
  fiftyPlusContent: ["fifty_plus"],
  downloadablePdf: ["fifty_plus"],
  gamesAccess: ["games_access"], // Phase 2; entitlement doesn't exist yet.
};

export function entitlementsFor(capability: Capability): string[] {
  return ENTITLEMENT_FOR[capability] ?? [];
}
