// src/ui/Card.tsx
// Stub surface wrapper. TODO(Phase C): pressable variant, elevation options.

import type { ReactNode } from "react";
import { View, type ViewStyle } from "react-native";

import { useTheme } from "@/theme/useTheme";

export interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export function Card({ children, style, testID }: CardProps) {
  const t = useTheme();
  return (
    <View
      testID={testID}
      style={{
        backgroundColor: t.colors.surface,
        borderColor: t.colors.border,
        borderWidth: 1,
        padding: t.spacing[4],
        borderRadius: t.radii.md,
        ...t.shadows.sm,
        ...style,
      }}
    >
      {children}
    </View>
  );
}
