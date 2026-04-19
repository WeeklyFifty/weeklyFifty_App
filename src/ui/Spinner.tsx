// src/ui/Spinner.tsx
// Stub loading indicator. TODO(Phase B): add inline/block size variants.

import { ActivityIndicator } from "react-native";

import { useTheme } from "@/theme/useTheme";

export interface SpinnerProps {
  size?: "small" | "large";
  testID?: string;
}

export function Spinner({ size = "small", testID }: SpinnerProps) {
  const t = useTheme();
  return <ActivityIndicator testID={testID} size={size} color={t.colors.brand} />;
}
