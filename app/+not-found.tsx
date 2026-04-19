// app/+not-found.tsx
// Catch-all 404. TODO(Phase E): copy + CTA back to home.

import { Link, Stack } from "expo-router";

import { Screen } from "@/ui/Screen";
import { Text } from "@/ui/Text";

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: "Not found" }} />
      <Screen>
        <Text variant="heading">Page not found</Text>
        <Link href="/(tabs)/home">
          <Text color="secondary">Go home</Text>
        </Link>
      </Screen>
    </>
  );
}
