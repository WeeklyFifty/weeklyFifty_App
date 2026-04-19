// src/ui/Button.tsx
// Stub. Props typed for real-world usage so consumers type-check today.
// TODO(Phase B): real pressed/disabled/loading states + haptics.

import { Pressable, type ViewStyle } from "react-native";

import { useTheme } from "@/theme/useTheme";

import { Text } from "./Text";

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  accessibilityLabel: string;
  style?: ViewStyle;
  testID?: string;
}

export function Button({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  accessibilityLabel,
  style,
  testID,
}: ButtonProps) {
  const t = useTheme();
  const bg =
    variant === "primary"
      ? t.colors.brand
      : variant === "secondary"
        ? t.colors.surfaceMuted
        : "transparent";
  const fg = variant === "primary" ? t.colors.textInverse : t.colors.textPrimary;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      testID={testID}
      style={{
        backgroundColor: bg,
        paddingVertical: t.spacing[3],
        paddingHorizontal: t.spacing[4],
        borderRadius: t.radii.md,
        opacity: disabled ? 0.5 : 1,
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <Text style={{ color: fg }}>{label}</Text>
    </Pressable>
  );
}
