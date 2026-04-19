// app/notification/[id].tsx
// Deep-link landing page. TODO(arch §18.4): route inbound links through
// `deepLinkRouter` so future content types are slot-in.

import { useLocalSearchParams } from "expo-router";

import { Screen } from "@/ui/Screen";
import { Text } from "@/ui/Text";

export default function NotificationLanding() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <Screen>
      <Text variant="heading">notification</Text>
      <Text color="secondary">id: {id} — arch §18.4 deep-link router</Text>
    </Screen>
  );
}
