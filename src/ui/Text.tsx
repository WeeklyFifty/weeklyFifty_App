// src/ui/Text.tsx
// Theme-aware text primitive. Applies foreground colour + size per variant.

import type { ReactNode } from "react";
import { Text as RNText, type TextStyle } from "react-native";

import { useTheme } from "@/theme/useTheme";

export type TextVariant = "display" | "heading" | "body" | "caption";

export interface TextProps {
  children: ReactNode;
  variant?: TextVariant;
  color?: "primary" | "secondary" | "inverse" | "danger";
  style?: TextStyle;
  testID?: string;
  accessibilityRole?: "text" | "header";
}

export function Text({
  children,
  variant = "body",
  color = "primary",
  style,
  testID,
  accessibilityRole,
}: TextProps) {
  const t = useTheme();
  const sizeMap: Record<TextVariant, number> = {
    display: t.typography.size.display,
    heading: t.typography.size["2xl"],
    body: t.typography.size.md,
    caption: t.typography.size.sm,
  };
  const weightMap: Record<TextVariant, TextStyle["fontWeight"]> = {
    display: t.typography.weight.bold,
    heading: t.typography.weight.semibold,
    body: t.typography.weight.regular,
    caption: t.typography.weight.regular,
  };
  const colorMap: Record<NonNullable<TextProps["color"]>, string> = {
    primary: t.colors.textPrimary,
    secondary: t.colors.textSecondary,
    inverse: t.colors.textInverse,
    danger: t.colors.danger,
  };
  return (
    <RNText
      testID={testID}
      accessibilityRole={accessibilityRole}
      style={[
        {
          color: colorMap[color],
          fontSize: sizeMap[variant],
          fontWeight: weightMap[variant],
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}
