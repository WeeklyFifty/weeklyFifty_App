// src/config/featureFlags.ts
// Placeholder for PostHog + RC-driven feature flag wrappers.
// TODO(Phase E, arch §14): wire to PostHog `useFeatureFlag` + RC flags
// once analytics is initialised.

export type FeatureFlag = "games_tab_enabled" | "dark_mode_enabled";

export function isFeatureEnabled(_flag: FeatureFlag): boolean {
  // All flags default to off in Phase A.
  return false;
}
