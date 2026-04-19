// src/config/links.ts
// External URLs surfaced in Settings/Paywall/etc.
// TODO(Phase F / OQ-10): confirm real URLs with James before submission.

export const LINKS = {
  privacy: "https://theweeklyfifty.com.au/privacy",
  terms: "https://theweeklyfifty.com.au/terms",
  support: "https://theweeklyfifty.com.au/support",
  marketing: "https://theweeklyfifty.com.au",
} as const;

export type LinkKey = keyof typeof LINKS;
