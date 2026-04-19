// src/lib/env.ts
// Typed env accessor. Arch §15.4 uses strict `required()` calls that throw
// on missing variables — that blocks the scaffold from booting without a
// .env file, so in Phase A we log warnings and fall back to empty strings.
//
// TODO(Phase B): switch to strict mode once Tom has real env values wired
// via `eas secret:create`. Re-introduce the `required()` helper then.

import Constants from "expo-constants";

function optional(name: string, value: string | undefined): string {
  if (!value) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.warn(`[env] Missing ${name} — using empty string. Fill .env before Phase B.`);
    }
    return "";
  }
  return value;
}

type AppEnv = "development" | "staging" | "production";

export const env = {
  APP_ENV: ((Constants.expoConfig?.extra as { env?: AppEnv } | undefined)?.env ??
    "development") as AppEnv,
  EXPO_PUBLIC_API_BASE_URL: optional(
    "EXPO_PUBLIC_API_BASE_URL",
    process.env.EXPO_PUBLIC_API_BASE_URL,
  ),
  EXPO_PUBLIC_SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN ?? "",
  EXPO_PUBLIC_POSTHOG_KEY: optional("EXPO_PUBLIC_POSTHOG_KEY", process.env.EXPO_PUBLIC_POSTHOG_KEY),
  RC_API_KEY_IOS: optional("EXPO_PUBLIC_RC_KEY_IOS", process.env.EXPO_PUBLIC_RC_KEY_IOS),
  RC_API_KEY_ANDROID: optional(
    "EXPO_PUBLIC_RC_KEY_ANDROID",
    process.env.EXPO_PUBLIC_RC_KEY_ANDROID,
  ),
  GOOGLE_OAUTH_WEB_CLIENT_ID: optional(
    "EXPO_PUBLIC_GOOGLE_OAUTH_WEB_CLIENT_ID",
    process.env.EXPO_PUBLIC_GOOGLE_OAUTH_WEB_CLIENT_ID,
  ),
} as const;
