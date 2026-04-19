// src/ui/ErrorState.tsx
// Stub error view. TODO(Phase B): map ApiError.code → user-friendly copy.

import { View } from "react-native";

import { useTheme } from "@/theme/useTheme";

import { Button } from "./Button";
import { Text } from "./Text";

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  testID?: string;
}

export function ErrorState({ title = "Something went wrong", message, onRetry, testID }: ErrorStateProps) {
  const t = useTheme();
  return (
    <View testID={testID} style={{ padding: t.spacing[6], gap: t.spacing[3] }}>
      <Text variant="heading" color="danger">
        {title}
      </Text>
      <Text color="secondary">{message}</Text>
      {onRetry ? <Button label="Try again" onPress={onRetry} accessibilityLabel="Retry" /> : null}
    </View>
  );
}
