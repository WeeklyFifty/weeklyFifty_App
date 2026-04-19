// src/ui/EmptyState.tsx
// Stub placeholder for empty lists / zero states.
// TODO(Phase C): add illustration slot, CTA variants.

import { View } from "react-native";

import { useTheme } from "@/theme/useTheme";

import { Text } from "./Text";

export interface EmptyStateProps {
  title: string;
  description?: string;
  testID?: string;
}

export function EmptyState({ title, description, testID }: EmptyStateProps) {
  const t = useTheme();
  return (
    <View
      testID={testID}
      style={{ alignItems: "center", padding: t.spacing[6], gap: t.spacing[2] }}
    >
      <Text variant="heading">{title}</Text>
      {description ? (
        <Text variant="caption" color="secondary">
          {description}
        </Text>
      ) : null}
    </View>
  );
}
