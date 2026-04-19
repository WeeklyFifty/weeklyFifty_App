// src/ui/Screen.tsx
// Functional primitive. Wraps SafeAreaView and applies the theme background.

import type { ReactNode } from "react";
import { ScrollView, View, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/theme/useTheme";

export interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export function Screen({ children, scroll = false, padded = true, style, testID }: ScreenProps) {
  const t = useTheme();
  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: t.colors.background,
    padding: padded ? t.spacing[4] : 0,
    ...style,
  };
  if (scroll) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.background }} testID={testID}>
        <ScrollView contentContainerStyle={{ padding: padded ? t.spacing[4] : 0 }}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.background }} testID={testID}>
      <View style={containerStyle}>{children}</View>
    </SafeAreaView>
  );
}
