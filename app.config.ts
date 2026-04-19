// app.config.ts
// Env-aware Expo configuration. Sourced from arch §15.3 with scaffold-friendly
// defaults so the app boots without a .env file present.
//
// TODO(Phase B+): wire EAS_PROJECT_ID, Apple team id, etc. from `eas secret`.

import type { ExpoConfig, ConfigContext } from "expo/config";

type AppEnv = "development" | "staging" | "production";
const APP_ENV = (process.env.APP_ENV ?? "development") as AppEnv;

const ids = {
  development: {
    ios: "au.com.theweeklyfifty.dev",
    android: "au.com.theweeklyfifty.dev",
  },
  staging: {
    ios: "au.com.theweeklyfifty.staging",
    android: "au.com.theweeklyfifty.staging",
  },
  production: {
    ios: "au.com.theweeklyfifty",
    android: "au.com.theweeklyfifty",
  },
}[APP_ENV];

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: APP_ENV === "production" ? "Weekly Fifty" : `Weekly Fifty (${APP_ENV})`,
  slug: "weekly-fifty",
  version: "1.0.0",
  scheme: "weeklyfifty",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
  },
  updates: {
    // TODO(Phase A follow-up): replace with real EAS project URL after `eas init`.
    fallbackToCacheTimeout: 0,
  },
  runtimeVersion: { policy: "appVersion" },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: ids.ios,
    supportsTablet: true,
    associatedDomains: ["applinks:theweeklyfifty.com.au"],
    infoPlist: {
      NSUserTrackingUsageDescription:
        "We use this to measure ad performance and improve the app.",
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    package: ids.android,
    adaptiveIcon: {
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundColor: "#FFFFFF",
    },
    permissions: ["NOTIFICATIONS"],
    intentFilters: [
      {
        action: "VIEW",
        data: [
          {
            scheme: "https",
            host: "theweeklyfifty.com.au",
            pathPrefix: "/app",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
        autoVerify: true,
      },
    ],
  },
  web: {
    favicon: "./assets/images/favicon.png",
  },
  extra: {
    env: APP_ENV,
    eas: { projectId: process.env.EAS_PROJECT_ID },
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    "expo-font",
    [
      "expo-notifications",
      {
        // TODO(Phase A follow-up): swap for a real notification icon asset.
        color: "#0F4C3A",
      },
    ],
    "expo-apple-authentication",
    "@sentry/react-native/expo",
  ],
  experiments: { typedRoutes: true },
});
