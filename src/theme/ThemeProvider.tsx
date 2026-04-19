// src/theme/ThemeProvider.tsx
// Arch §6.2. Dark mode is scaffolded but not exposed in MVP (see §6.3).

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useColorScheme } from "react-native";

import { darkTheme, lightTheme, type Theme, type ThemeName } from "./tokens";

const ThemeContext = createContext<Theme>(lightTheme);

export function ThemeProvider({
  children,
  override,
}: {
  children: ReactNode;
  override?: ThemeName;
}) {
  // System color scheme is resolved but intentionally ignored in MVP.
  // TODO(arch §6.3): honour `useColorScheme()` when dark mode is released.
  useColorScheme();
  const name: ThemeName = override ?? "light";
  const theme = useMemo(() => (name === "dark" ? darkTheme : lightTheme), [name]);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export const useTheme = (): Theme => useContext(ThemeContext);
