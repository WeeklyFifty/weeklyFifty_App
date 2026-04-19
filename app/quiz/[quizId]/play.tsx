// app/quiz/[quizId]/play.tsx
// Quiz runner. TODO(Phase C): question card + answer input + persistence
// of in-progress answers via Zustand persist.

import { useLocalSearchParams } from "expo-router";

import { Screen } from "@/ui/Screen";
import { Text } from "@/ui/Text";

export default function QuizPlay() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  return (
    <Screen>
      <Text variant="heading">quiz play</Text>
      <Text color="secondary">quizId: {quizId}</Text>
    </Screen>
  );
}
