// src/entitlements/RevenueCatProvider.tsx
// Phase A pass-through stub. The react-native-purchases SDK is installed so
// that useEntitlement can type-check against its types, but we do NOT call
// `Purchases.configure` until Phase D when real API keys exist.
//
// TODO(arch §11.3): wire real init — configure on mount, logIn/logOut
// mirrored to the auth state machine.

import type { ReactNode } from "react";

// Import kept commented out to document intent without forcing native-module
// evaluation during scaffold boot.
// import Purchases, { LOG_LEVEL } from "react-native-purchases";

export function RevenueCatProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
