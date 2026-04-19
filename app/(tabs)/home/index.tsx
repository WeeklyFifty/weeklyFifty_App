// app/(tabs)/home/index.tsx
// Stub. TODO(arch §8.2 / §7.2): render this week's quiz card via
// `useCurrentQuiz()` once the quiz endpoint lands in Phase C.

import { Screen } from "@/ui/Screen";
import { Text } from "@/ui/Text";

export default function Home() {
  return (
    <Screen>
      <Text variant="heading">home</Text>
      <Text color="secondary">Stub screen — arch §8.2, §7.2</Text>
    </Screen>
  );
}
