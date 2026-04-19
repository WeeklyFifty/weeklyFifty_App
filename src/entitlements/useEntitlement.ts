// src/entitlements/useEntitlement.ts
// Phase A stub. Returns `{ active: false, loading: false, refresh }` so
// consumers can type-check against the production signature today.
//
// TODO(arch §11.4): replace with the real hook in Phase D — subscribe to
// `Purchases.addCustomerInfoUpdateListener` and derive `active` from the
// capability→entitlement map.

import type { Capability } from "./capabilities";

export interface EntitlementResult {
  active: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
}

export function useEntitlement(_capability: Capability): EntitlementResult {
  return {
    active: false,
    loading: false,
    refresh: async () => {
      /* stub — real refresh wired in Phase D */
    },
  };
}
