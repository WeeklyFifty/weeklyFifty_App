// app/quiz/_layout.tsx
// Quiz is presented full-screen modally over tabs (arch §7.1).

import { Stack } from "expo-router";

export default function QuizLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "fullScreenModal",
      }}
    />
  );
}
