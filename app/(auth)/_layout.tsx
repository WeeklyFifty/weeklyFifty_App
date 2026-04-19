// app/(auth)/_layout.tsx
// Stack for sign-in / sign-up / forgot / verify / welcome flows.
// TODO(arch §10): add redirect-if-authenticated guard.

import { Stack } from "expo-router";

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
