// src/theme/typography.ts
// Font registration stub. Expo's `useFonts` wants a map of family name →
// required font file. Drop .ttf / .otf files into assets/fonts/ and wire them
// here when fonts are selected (arch §6.4).
//
// TODO(Phase A follow-up): procure real font files (Inter / Lora / Fraunces
// per tokens.ts **Assumption** markers) and populate `fontFiles` below.

import { Platform } from "react-native";

// Map of font family name (as used in StyleSheet) → require(...) of the file.
// Empty until fonts are procured.
export const fontFiles: Record<string, number> = {
  // Example once files exist:
  // "Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
};

// Platform fallback stack so screens render sensibly before custom fonts load.
export const fallbackSans = Platform.select({
  ios: "System",
  android: "Roboto",
  default: "System",
});

export const fallbackSerif = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "Georgia",
});
