// app/(tabs)/past-quizzes/index.tsx
// Stub. TODO(arch §8.2 archive + §11.4): Fifty+ paywall gate via
// `useEntitlement("fiftyPlusContent")`.

import { Screen } from "@/ui/Screen";
import { Text } from "@/ui/Text";

export default function PastQuizzes() {
  return (
    <Screen>
      <Text variant="heading">past-quizzes</Text>
      <Text color="secondary">Stub screen — arch §8.2, §11.4</Text>
    </Screen>
  );
}
