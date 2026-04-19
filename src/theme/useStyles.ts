// src/theme/useStyles.ts
// Arch §6.2: memoised StyleSheet factory bound to the current theme.

import { useMemo } from "react";
import { StyleSheet } from "react-native";

import { useTheme } from "./ThemeProvider";
import type { Theme } from "./tokens";

export function useStyles<T extends StyleSheet.NamedStyles<T>>(factory: (t: Theme) => T): T {
  const t = useTheme();
  return useMemo(() => StyleSheet.create(factory(t)), [t, factory]);
}
