// types.d.ts
// Augment process.env with the EXPO_PUBLIC_* keys the app reads. Keeping
// them optional here means missing keys don't break typecheck; runtime
// validation happens in src/lib/env.ts.

declare namespace NodeJS {
  interface ProcessEnv {
    APP_ENV?: "development" | "staging" | "production";
    EAS_PROJECT_ID?: string;
    EXPO_PUBLIC_API_BASE_URL?: string;
    EXPO_PUBLIC_SENTRY_DSN?: string;
    EXPO_PUBLIC_POSTHOG_KEY?: string;
    EXPO_PUBLIC_RC_KEY_IOS?: string;
    EXPO_PUBLIC_RC_KEY_ANDROID?: string;
    EXPO_PUBLIC_GOOGLE_OAUTH_WEB_CLIENT_ID?: string;
  }
}
