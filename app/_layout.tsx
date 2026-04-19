// app/_layout.tsx
// Root layout. Mounts providers in the order specified by arch §7.1:
//   QueryClientProvider → ThemeProvider → RevenueCatProvider → (AuthProvider) → (PostHogProvider) → <Stack>
//
// Phase A: AuthProvider and PostHogProvider are TODO. Sentry.init is
// commented-out with a TODO referencing arch §14.2.

import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// TODO(arch §14.2 — Phase E): initialise Sentry here before anything else.
// import * as Sentry from "@sentry/react-native";
// Sentry.init({
//   dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
//   enabled: !__DEV__,
//   environment: Constants.expoConfig?.extra?.env ?? "production",
//   release: Constants.expoConfig?.version,
//   tracesSampleRate: 0.1,
// });

import { queryClient } from "@/api/queryClient";
import { RevenueCatProvider } from "@/entitlements/RevenueCatProvider";
import { ThemeProvider } from "@/theme/ThemeProvider";

// TODO(Phase A follow-up, arch §6.4): load self-hosted fonts via useFonts()
// once font files land in assets/fonts/.

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RevenueCatProvider>
          {/* TODO(Phase B): <AuthProvider> */}
          {/* TODO(Phase E): <PostHogProvider> */}
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }} />
        </RevenueCatProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
