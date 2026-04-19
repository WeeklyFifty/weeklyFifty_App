// src/theme/tokens.ts
//
// Port of arch §6.1. All placeholder values carry a `**Assumption:**` marker
// that James / Tom must confirm against the Weekly Fifty website.

export type ColorRole =
  | "background"
  | "surface"
  | "surfaceMuted"
  | "border"
  | "textPrimary"
  | "textSecondary"
  | "textInverse"
  | "brand"
  | "brandMuted"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "overlay";

export type ThemeName = "light" | "dark";

export interface Shadow {
  shadowColor: string;
  shadowOpacity: number;
  shadowRadius: number;
  shadowOffset: { width: number; height: number };
  elevation: number;
}

export interface Theme {
  name: ThemeName;
  colors: Record<ColorRole, string>;
  typography: {
    fontFamily: { sans: string; serif: string; display: string; mono: string };
    size: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      "2xl": number;
      "3xl": number;
      display: number;
    };
    weight: { regular: "400"; medium: "500"; semibold: "600"; bold: "700" };
    lineHeight: { tight: number; normal: number; relaxed: number };
  };
  spacing: {
    0: 0;
    1: 4;
    2: 8;
    3: 12;
    4: 16;
    5: 20;
    6: 24;
    8: 32;
    10: 40;
    12: 48;
    16: 64;
  };
  radii: { none: 0; sm: 4; md: 8; lg: 12; xl: 20; pill: 999 };
  shadows: { sm: Shadow; md: Shadow; lg: Shadow };
  motion: {
    durations: { fast: 150; base: 250; slow: 400 };
    easings: { standard: "ease-in-out"; emphasized: "ease-out" };
  };
}

// Concrete tokens — populated from the Weekly Fifty website CSS variables.
// Tom: open theweeklyfifty.com.au DevTools → :root → copy the variable values.
// **Assumption:** the website exposes brand colours via CSS custom properties;
// if not, eyedropper from screenshots and confirm with James.

export const lightTheme: Theme = {
  name: "light",
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceMuted: "#F5F4F0",
    border: "#E5E1D8",
    textPrimary: "#111111",
    textSecondary: "#5C5A55",
    textInverse: "#FFFFFF",
    brand: "#0F4C3A", // **Assumption:** Weekly Fifty deep green — confirm
    brandMuted: "#D6E5DE",
    accent: "#E0A92F", // **Assumption:** gold accent — confirm
    success: "#2E7D32",
    warning: "#ED6C02",
    danger: "#C62828",
    overlay: "rgba(0,0,0,0.5)",
  },
  typography: {
    fontFamily: {
      sans: "Inter", // **Assumption:** confirm with website
      serif: "Lora",
      display: "FrauncesDisplay",
      mono: "JetBrainsMono",
    },
    size: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, "2xl": 24, "3xl": 30, display: 40 },
    weight: { regular: "400", medium: "500", semibold: "600", bold: "700" },
    lineHeight: { tight: 1.15, normal: 1.4, relaxed: 1.6 },
  },
  spacing: { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64 },
  radii: { none: 0, sm: 4, md: 8, lg: 12, xl: 20, pill: 999 },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 1 },
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
    lg: {
      shadowColor: "#000",
      shadowOpacity: 0.16,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 8 },
      elevation: 8,
    },
  },
  motion: {
    durations: { fast: 150, base: 250, slow: 400 },
    easings: { standard: "ease-in-out", emphasized: "ease-out" },
  },
};

export const darkTheme: Theme = {
  ...lightTheme,
  name: "dark",
  colors: {
    background: "#111111",
    surface: "#1B1B1A",
    surfaceMuted: "#232220",
    border: "#3A3936",
    textPrimary: "#F5F4F0",
    textSecondary: "#B8B4AB",
    textInverse: "#111111",
    brand: "#5FB392",
    brandMuted: "#1F3A30",
    accent: "#E0A92F",
    success: "#81C784",
    warning: "#FFB74D",
    danger: "#EF5350",
    overlay: "rgba(0,0,0,0.7)",
  },
};
