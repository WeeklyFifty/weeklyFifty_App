// app/(tabs)/_layout.tsx
// Tabs navigator. Uses the four tabs specified in the user's scaffold task:
//   home, leaderboard, past-quizzes, settings
//
// TODO(OQ-16 / C2): arch doc §4.1 lists a different set of tabs
//   (home, games, shop, account). Tom + James must confirm the final tab
//   bar before Phase B ships. See scaffold-plan §6 (C2) for the full story.
//
// TODO(arch §7.2): add auth redirect — `if (status === "unauthenticated")
// return <Redirect href="/(auth)/sign-in" />`.

import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="leaderboard" options={{ title: "Leaderboard" }} />
      <Tabs.Screen name="past-quizzes" options={{ title: "Past quizzes" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
