// app/quiz/[quizId]/results.tsx
// Quiz results screen. TODO(Phase C): score summary + leaderboard rank.

import { useLocalSearchParams } from "expo-router";

import { Screen } from "@/ui/Screen";
import { Text } from "@/ui/Text";

export default function QuizResults() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  return (
    <Screen>
      <Text variant="heading">quiz results</Text>
      <Text color="secondary">quizId: {quizId}</Text>
    </Screen>
  );
}
