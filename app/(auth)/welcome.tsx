// app/(auth)/welcome.tsx
// Stub. Added per scaffold-plan §1.2 at user request — arch §4.1 does not
// list a welcome route; TODO: align with arch doc when onboarding flow is
// designed (OQ-3 clarifies gated vs guest access).

import { Screen } from "@/ui/Screen";
import { Text } from "@/ui/Text";

export default function Welcome() {
  return (
    <Screen>
      <Text variant="heading">welcome</Text>
      <Text color="secondary">Stub screen — user-requested, not in arch §4.1</Text>
    </Screen>
  );
}
