// app/quiz/[quizId]/review.tsx
// Per-question review. TODO(arch §11.4): Fifty+ paywall gate.

import { useLocalSearchParams } from "expo-router";

import { Screen } from "@/ui/Screen";
import { Text } from "@/ui/Text";

export default function QuizReview() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  return (
    <Screen>
      <Text variant="heading">quiz review</Text>
      <Text color="secondary">quizId: {quizId} — arch §11.4 Fifty+ gate</Text>
    </Screen>
  );
}
