// app/quiz/[quizId]/index.tsx
// Quiz intro / start screen. TODO(arch §8.3): wire to useCurrentQuiz /
// quiz session store (Phase C).

import { useLocalSearchParams } from "expo-router";

import { Screen } from "@/ui/Screen";
import { Text } from "@/ui/Text";

export default function QuizIntro() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  return (
    <Screen>
      <Text variant="heading">quiz intro</Text>
      <Text color="secondary">quizId: {quizId} — arch §8.3</Text>
    </Screen>
  );
}
