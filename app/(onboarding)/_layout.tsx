// app/(onboarding)/_layout.tsx
// Stub stack. TODO: align with arch doc §4.1 (which doesn't list
// onboarding as a route group) when the onboarding flow is designed.

import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
