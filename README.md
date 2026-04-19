# Weekly Fifty (mobile)

The Weekly Fifty Friday quiz, native on iOS and Android. Phase A scaffold — no business logic yet, just the project skeleton, conventions, and provider wiring.

This README is written for Tom (backend dev, mobile-naive). If you've never shipped a React Native app before, read it top-to-bottom once. After that, treat it as reference.

---

## 1. Prerequisites

- **Node** 20.x or later (we use Node 22 in dev).
- **npm** 10.x (we use npm, not pnpm — see `CLAUDE.md` §8).
- **Xcode** (macOS only; install from the Mac App Store; ~12 GB).
  - Open Xcode once after installing so it accepts the licence and downloads the iOS Simulator runtime.
- **iOS Simulator** ships with Xcode; you can launch it with `open -a Simulator`.
- **Android Studio** (optional, for Android development) — install via brew cask `brew install --cask android-studio`. Open it once and let it install the Android SDK and an emulator image.
- **Watchman** (recommended for Metro performance): `brew install watchman`.
- **Expo account** (free): https://expo.dev/signup. Used for EAS Build / Submit / Updates.
- **EAS CLI**: `npm install -g eas-cli` (used after Phase A to produce dev/preview/production builds).
- **Apple Developer account** ($99/yr) — needed to install on a real iPhone or to ship to TestFlight / App Store. Not needed for the iOS Simulator.
- **Google Play Console account** ($25 one-off) — needed to ship to Play. Not needed for the emulator.

You do NOT need a physical device to start. iOS Simulator + Android Emulator are enough for Phase A and most of Phase B.

---

## 2. Quick start

```bash
cp .env.example .env       # edit values once you have them; safe defaults work for scaffold
npm install
npm run start              # starts Metro
```

Then in the Metro UI press `i` for iOS Simulator or `a` for Android Emulator. The app should boot to the splash, redirect to the home stub, and you'll see the text "home" with the brand-tinted background.

---

## 3. Expo Go vs Development Build

This is the most common confusion for new mobile devs. Read carefully.

- **Expo Go** is a pre-built host app you install from the App Store / Play Store on your real phone. It can run any Expo project that uses ONLY the modules Expo Go ships with. Fast. No build step. Limited.
- **Development build** is YOUR app, built once on EAS or locally, with all your native dependencies (MMKV, RevenueCat, expo-notifications, etc.) compiled in. You install the resulting `.app` / `.apk` on a simulator/emulator/device.

Phase A right now compiles cleanly in **Expo Go** because all the heavy native modules (RevenueCat, MMKV) are installed but not yet _used_ at runtime — the providers are stubs. As soon as we wire MMKV in Phase B (auth token storage) or RevenueCat in Phase D, **Expo Go will break** and you must use a development build.

**To make a development build:**

```bash
eas init                                                    # one-off — registers the project under your Expo account
eas build --profile development --platform ios --local      # ~15 min the first time
# or `--platform android --local` for Android
```

Install the resulting `.app` (drag onto Simulator) or `.apk` (`adb install path/to/app.apk`).

Re-run `eas build --profile development` only when you add/remove a native module or change `app.config.ts`. JavaScript-only changes do NOT require a rebuild — just shake the device / press `r` in Metro.

---

## 4. iOS Simulator vs Android Emulator

Both are virtual devices; both run real native code. Expectations differ.

- **iOS Simulator** is fast, snappy, and macOS-only. It does not run binaries built for real devices (different architecture). Build with `eas build --profile development --platform ios` with the `simulator: true` flag (already set in `eas.json`).
- **Android Emulator** is slower, requires a system image (downloadable in Android Studio under Tools → SDK Manager → SDK Platforms). Once installed, list emulators with `emulator -list-avds` and run with `emulator -avd <name>`.

Useful iOS Simulator commands:

```bash
xcrun simctl list devices                # list available simulators
xcrun simctl boot "iPhone 15"            # boot a specific one
xcrun simctl erase all                   # nuclear option — wipe all simulators
open -a Simulator                        # open the Simulator app
```

Useful Android commands:

```bash
adb devices                              # list connected devices/emulators
adb logcat | grep -i "ReactNative"       # tail logs from the app
```

---

## 5. Scripts reference

| Script                   | What it does                                                                                                                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run start`          | Start Metro bundler (interactive)                                                                                                                                                                    |
| `npm run ios`            | Start Metro and open the iOS Simulator                                                                                                                                                               |
| `npm run android`        | Start Metro and open the Android Emulator                                                                                                                                                            |
| `npm run typecheck`      | `tsc --noEmit` — must always pass                                                                                                                                                                    |
| `npm run lint`           | ESLint over `app/`, `src/`, `tests/`                                                                                                                                                                 |
| `npm test`               | Jest test runner                                                                                                                                                                                     |
| `npm run format`         | Prettier write over `app/` and `src/`                                                                                                                                                                |
| `npm run prebuild:check` | Smoke check: `expo prebuild --clean --no-install` then deletes the generated `ios/` + `android/` folders. Use this to verify `app.config.ts` plugins are coherent without committing native folders. |

---

## 6. Project structure (tour)

```
app/                         # Expo Router routes (composition only, no logic)
  _layout.tsx                #   root providers: QueryClient, Theme, RevenueCat
  index.tsx                  #   redirect → /(tabs)/home (auth-aware in Phase B)
  (auth)/                    #   sign-in, sign-up, forgot-password, etc.
  (onboarding)/              #   onboarding stack (placeholder)
  (tabs)/                    #   home, leaderboard, past-quizzes, settings
  quiz/[quizId]/             #   intro / play / results / review (modal stack)
  paywall.tsx                #   modal paywall stub
  notification/[id].tsx      #   deep-link landing
src/
  theme/                     #   tokens, ThemeProvider, useStyles, typography
  ui/                        #   primitives: Screen, Text, Button, Card, ...
  features/                  #   feature modules (filled phase-by-phase)
  api/                       #   client, errors, interceptors, queryClient, keys
  auth/                      #   Phase B
  entitlements/              #   capabilities + useEntitlement (stubbed)
  notifications/             #   Phase E
  analytics/                 #   Phase E
  content/                   #   Phase 2 content-type abstraction
  config/                    #   constants, featureFlags, links
  lib/                       #   leaf utilities + storage/{kvStore,secureStore}
  types/                     #   branded ids, domain
assets/                      #   fonts, images, icons, splash
docs/                        #   architecture doc lives here
tests/                       #   Jest setup + smoke test
```

Routes use Expo Router file-based conventions (`(group)` for layout groups, `[param]` for dynamic segments, `+not-found.tsx` for 404). Each stub screen renders its name + a TODO referencing the architecture doc section that will fill it in.

For the full tree and rationale, see `docs/weekly-fifty-architecture.md` §4.

---

## 7. Where the docs live

- `docs/weekly-fifty-architecture.md` — the binding architecture doc (~2,250 lines, 24 sections). Read sections 3, 4, 5, 6 first.
- `docs/README.md` — a navigation guide for the architecture doc (which sections matter for which phase).
- `CLAUDE.md` (repo root) — the project constitution. Banned libraries, naming, import boundaries, hard rules. Claude Code reads this automatically.

---

## 8. What to build next

Phase A is done. Next up: **Phase B — Auth + API client** (arch §9 + §10).

Recommended workflow: open this repo in Claude Code, then paste the **Appendix A → "Phase B — Auth"** prompt (in the architecture doc) verbatim into a new session. Claude will read `CLAUDE.md` and the relevant arch sections, then implement.

---

## 9. Open questions blocking the roadmap

The arch doc §23 lists 15 open questions; some block phase transitions. The ones to resolve before / during Phase A → B are:

- **OQ-1** Confirm REST API base URL, auth scheme, and exact response shapes for `/quizzes/current`, `/quizzes/:id`, `/quizzes/:id/submit`, `/users/me`. (Backend team.)
- **OQ-2** Refresh-token semantics: rotating? sliding window? max lifetime? (Backend team.)
- **OQ-3** Do unauthenticated users see anything (e.g., current quiz preview), or is the app sign-in-walled like the website? (James.)
- **OQ-4** Final Weekly Fifty brand tokens — colours, fonts, type scale. (James + designer; the scaffold uses placeholders marked `**Assumption:**` in `src/theme/tokens.ts`.)
- **OQ-5** Apple Developer + Google Play Developer accounts: provisioned? Bundle id `au.com.theweeklyfifty` available on both? (Tom.)
- **OQ-13** Social auth: which providers required (Apple confirmed; Google confirmed; Facebook?). (James.)
- **OQ-16** _(NEW)_ Tab bar mismatch — the user-supplied scaffold task lists tabs `home / leaderboard / past-quizzes / settings`, but arch doc §4.1 lists `home / games / shop / account`. The scaffold follows the user's task; Tom + James must confirm the production tab bar before Phase B ships. See `app/(tabs)/_layout.tsx` TODO.

The remaining OQs (OQ-6 through OQ-15 minus 13) are documented in `docs/weekly-fifty-architecture.md` §23 and are tied to later phases.

---

## 10. Troubleshooting (common Expo gotchas)

- **Metro bundler cache corruption** → `npm run start -- --clear`. Or `rm -rf .expo node_modules && npm install`.
- **iOS Simulator won't open / shows old build** → `xcrun simctl erase all` then re-run `npm run ios`.
- **EAS build fails with credentials error** → `eas credentials` for an interactive reset.
- **Native module version mismatch** → always use `npx expo install <pkg>` for `expo-*` and `react-native-*` packages — never bare `npm install` for those — so versions match the SDK.
- **iOS pod install errors** (only relevant if you ever generate native folders) → `cd ios && pod deintegrate && pod install` after running `npx expo prebuild`.
- **"Unable to resolve `@/foo`"** → check `babel.config.js` has `module-resolver` configured AND `tsconfig.json` paths are intact. Restart Metro with `--clear`.
- **TypeScript errors after pulling main** → `npm install` (someone added a dep) and `npm run typecheck`.
- **Tests fail with "invariant violation: native module missing"** → ensure the module is mocked in `tests/setup.ts` (see the MMKV mock there as a template).

---

## 11. Convention cheat sheet (arch §5 in 10 bullets)

1. TypeScript strict + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`.
2. No `any`. Use `unknown` and narrow.
3. Branded ids (`QuizId`, `UserId`, `QuestionId`).
4. Functions over classes (classes only when wrapping a stateful SDK).
5. Named exports for everything except components (which default-export).
6. No barrel `index.ts` files (one documented exception: `src/lib/storage/index.ts`).
7. Imports ordered: builtin → external → internal → relative. ESLint enforces.
8. One concept per file.
9. Path alias `@/*` → `src/*`.
10. `accessibilityLabel` + `accessibilityRole` on every `Pressable` / `TouchableOpacity` (lint enforces).

---

## 12. How to use Claude Code in this repo

1. Open the repo in your editor with Claude Code installed.
2. Claude reads `CLAUDE.md` automatically — that's the project constitution (banned libs, conventions, etc.).
3. For phase work, copy the relevant **Appendix A** prompt from `docs/weekly-fifty-architecture.md` and paste it as your first message in a new Claude Code session. The prompt tells Claude which arch sections to read first.
4. Always reference the arch doc in your prompts. Example: "Per arch §11.4, implement `useEntitlement` for real (replacing the stub) using `react-native-purchases`."
5. If you ask for a new dependency, the answer is "no" unless the arch doc agrees or you and James update the arch doc first.

---

## 13. Environment variables

Every key in `.env.example` with where to get its value:

| Key                                      | Where to find it                                                                                                                              |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `EXPO_PUBLIC_API_BASE_URL`               | The Weekly Fifty backend URL — confirm with backend team. Currently set to `https://api.theweeklyfifty.com.au` as a placeholder.              |
| `EXPO_PUBLIC_SENTRY_DSN`                 | https://sentry.io → project → Settings → Client Keys (DSN). Public DSN is safe to expose.                                                     |
| `EXPO_PUBLIC_POSTHOG_KEY`                | https://app.posthog.com → Project Settings → Project API Key.                                                                                 |
| `EXPO_PUBLIC_RC_KEY_IOS`                 | https://app.revenuecat.com → Project → Apps → iOS → Public App-specific API key.                                                              |
| `EXPO_PUBLIC_RC_KEY_ANDROID`             | Same place, Android app.                                                                                                                      |
| `EXPO_PUBLIC_GOOGLE_OAUTH_WEB_CLIENT_ID` | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client ID (Web application).                                                 |
| `APP_ENV`                                | `development` for local, `staging` for preview builds, `production` for App Store builds. EAS sets it automatically per profile (`eas.json`). |
| `EAS_PROJECT_ID`                         | Created by `eas init`. Leave blank before first `eas init`.                                                                                   |

`EXPO_PUBLIC_*` variables are bundled into the JS runtime — do NOT put real secrets there. Anything else (e.g., service-account JSON) goes in EAS Build secrets via `eas secret:create`.

---

## 14. Licence / copyright

TBD with James.
