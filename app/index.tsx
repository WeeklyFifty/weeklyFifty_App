// app/index.tsx
// Splash / redirect stub. Once auth is wired (Phase B) this will redirect
// based on `useAuth()` status — authed users to (tabs), unauthed to (auth).
//
// TODO(arch §10): replace the unconditional redirect with auth-aware logic.

import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/(tabs)/home" />;
}
