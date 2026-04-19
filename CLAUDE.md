# CLAUDE.md — Weekly Fifty Project Constitution

This file is the contract for any Claude Code (or Cursor / Copilot / etc.) session working in this repo. Read it first, then read `docs/weekly-fifty-architecture.md` (the binding source of truth). Anything in this file overrides any default Claude behaviour.

## 1. One-paragraph summary

Weekly Fifty is an Expo / React Native mobile app (iOS + Android, managed workflow) that brings the Friday-published 50-question pub quiz from theweeklyfifty.com.au into a native app. MVP is website parity; Phase 2 adds games. Solo developer (Tom). Backend is an existing REST API (shape not yet confirmed — OQ-1).

## 2. Hard rules — banned libraries

These are non-negotiable. Do NOT add any of the following without explicit approval from James and a corresponding update to the architecture doc:

- **AsyncStorage** (`@react-native-async-storage/async-storage`) — we use MMKV everywhere non-secret. Tokens go in `expo-secure-store` only. See arch §13.
- **axios** — use the native `fetch` via `src/api/client.ts`. See arch §9.
- **sentry-expo** — deprecated since Expo SDK 50. We use `@sentry/react-native` with its Expo config plugin. See decision D4 in `.scaffold-plan.md`.
- **Redux** / `@reduxjs/toolkit` — server state goes in TanStack Query, UI state in Zustand. See arch §8.
- **Jotai** — same reason. One state library, not two.
- **Mixpanel** / **Amplitude** — we use PostHog. See arch §14.
- **Firebase messaging** (`@react-native-firebase/messaging`) — we use Expo Notifications, which fronts both APNs and FCM. Switching is a Phase 3 risk only. See arch §12.1.
- **react-native-iap** — use RevenueCat (`react-native-purchases`). See arch §11.
- **Tailwind / NativeWind** — styling goes through theme tokens + `StyleSheet.create`. See arch §6.
- **Reanimated** (`react-native-reanimated`) — avoided in MVP. Use built-in `Animated` or `LayoutAnimation`. The Expo template adds Reanimated by default; we explicitly removed it.
- **react-native-purchases-ui** — deferred to Phase D (D10). The base `react-native-purchases` is installed.

If you think one of these is genuinely needed, stop and discuss with James first.

## 3. Stack summary (canonical)

- **Runtime:** Expo SDK 54, React Native 0.81.x, React 19.1, Expo Router 6, New Architecture ON.
- **Language:** TypeScript strict (`strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`).
- **State:** TanStack Query (server) + Zustand (UI) + `useState` (local). Never React Context for data.
- **HTTP:** native `fetch` wrapped by `src/api/client.ts`. Zod schemas at the boundary.
- **Storage:** `react-native-mmkv` for KV; `expo-secure-store` for secrets; persisted Query cache for offline-first reads.
- **Auth:** custom email/password + Apple + Google. State machine in `src/auth/`.
- **Subscriptions:** RevenueCat. Capability-based (`useEntitlement("fiftyPlusContent")`), not product-based.
- **Push:** Expo Notifications (fronts APNs + FCM).
- **Errors:** `@sentry/react-native`. Analytics: `posthog-react-native`.
- **Forms:** React Hook Form + Zod resolvers.
- **Lists:** `@shopify/flash-list` for anything > 50 items.

## 4. Folder map (arch §4.1 summary)

```
app/                         # Expo Router routes — composition only, no logic
src/
  theme/                     # tokens, ThemeProvider, useStyles, typography
  ui/                        # primitives — dumb, only theme + lib imports
  features/<name>/           # feature modules (hooks, components, store)
  api/                       # client, errors, interceptors, schemas, endpoints, queryClient, keys
  auth/                      # tokenStore, machine, AuthProvider, useAuth, socialAuth
  entitlements/              # capabilities, useEntitlement, RevenueCatProvider
  notifications/             # push, channels, deepLinkRouter (Phase E)
  analytics/                 # PostHog wrapper, event taxonomy (Phase E)
  content/                   # content-type abstraction (Phase 2 hook)
  config/                    # constants, featureFlags, links
  lib/                       # leaf utilities — env, logger, result, time, storage/
  types/                     # branded ids, domain, api
assets/                      # fonts, images, icons, splash
tests/                       # Jest setup, scaffold smoke test, mocks
docs/                        # architecture doc lives here
```

## 5. Import boundaries (arch §4.3 — enforced by ESLint)

```
ui  ← features  ← app
lib ← (api | auth | entitlements | notifications | analytics) ← features ← app
content ← features ← app
theme ← (everything UI)
```

- `app/` may import anything from `src/`.
- `src/features/<x>/` may import from `ui`, `lib`, `api`, `auth`, `entitlements`, `notifications`, `theme`, `content`, `analytics`, `types`. NOT from another feature.
- `src/ui/` may import only from `theme` and `lib`.
- `src/lib/` is leaf — imports from nothing inside `src/` except other `lib/` files.

ESLint enforces this via `import/no-restricted-paths`. If you hit a boundary error, the right move is usually to push the shared bit DOWN (into `lib` or `ui`), never to weaken the rule.

## 6. Naming conventions (arch §5.1)

| Kind | Convention | Example |
|---|---|---|
| Route files | `kebab-case.tsx` | `forgot-password.tsx` |
| Components | `PascalCase.tsx`, default export | `QuestionCard.tsx` |
| Hooks | `useThing.ts`, named export | `useEntitlement.ts` |
| Modules | `camelCase.ts`, named exports | `tokenStore.ts` |
| Zustand slices | `store.ts` co-located | `features/quiz/store.ts` |
| Tests | `*.test.ts(x)` next to source | `useEntitlement.test.ts` |
| Constants | `SCREAMING_SNAKE_CASE` | `QUIZ_QUESTION_LIMIT` |

## 7. TypeScript rules

- Strict mode is on. `any` is a lint error — use `unknown` and narrow.
- Branded IDs (`QuizId`, `UserId`, `QuestionId`) — use them.
- No default exports for non-components. Components default-export.
- Imports ordered: builtin → external → internal → relative. ESLint enforces.
- Path alias `@/*` → `src/*`. Wired in `tsconfig.json` and `babel.config.js`.

## 8. Package manager

We use **npm**, not pnpm. The arch doc §3.4 prefers pnpm but the user override (D1) is npm. Reason: Tom's onboarding context. If you generate commands, use `npm run` / `npm install` / `npx`.

## 9. When in doubt

The architecture doc is binding. Read `docs/weekly-fifty-architecture.md` — sections 3, 4, 5, 6 cover the foundations; 7–14 cover the implementation patterns; 15–17 cover release; 18 covers Phase 2 hooks; 19–20 cover testing/CI; 21 is the build order; Appendix A has phase-start prompts.

## 10. Phase pointers

| Phase | Arch section | Appendix A prompt |
|---|---|---|
| A — Skeleton | §4, §6 | "Phase A — Bootstrap" |
| B — Auth + API | §9, §10 | "Phase B — Auth" |
| C — Quiz | §8, §11.4 (gating) | "Phase C — Quiz" |
| D — Subscriptions | §11 | "Phase D — Subscriptions" |
| E — Push + Account | §12, §14, §17.3 | "Phase E — Polish" |
| F — Submission | §16, §17 | "Phase F — Submit" |

## 11. What NOT to do (enumerated)

- Don't add a new dependency without updating the arch doc and stating the case in the PR.
- Don't write tests before the feature code (TDD is not the workflow here — boundary tests only).
- Don't add barrel `index.ts` files. The single exception is `src/lib/storage/index.ts` (deliberate, documented in the file header).
- Don't use `any`. Use `unknown` and narrow.
- Don't inline styles in reusable components. Use `useStyles((t) => ...)`.
- Don't write to SecureStore for non-secrets — MMKV is the right tier.
- Don't call `fetch` from components — go through an endpoint module.
- Don't import across feature boundaries (`src/features/quiz` cannot import `src/features/account`).
- Don't run `eas init` from a Claude session — that requires Tom's Expo account.
- Don't push to GitHub from a Claude session unless explicitly asked.

## 12. Commands

```bash
npm install              # install deps
npm run start            # start Metro bundler
npm run ios              # open iOS simulator
npm run android          # open Android emulator
npm run typecheck        # tsc --noEmit
npm run lint             # eslint app/ src/ tests/
npm test                 # jest
npm run format           # prettier --write
npm run prebuild:check   # validates app.config.ts plugin coherence
```

## 13. Git conventions

Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`. Subject ≤ 72 chars. Body wraps at 100. Reference arch sections (e.g., `(arch §10.4)`) when it helps reviewers.

## 14. Pre-commit hooks

`lefthook` runs:
- pre-commit: ESLint + Prettier on staged TS/TSX/JSON/MD.
- pre-push: full `tsc --noEmit` and `npm test --bail --silent`.

If a hook fails, fix the issue and recommit. Don't `--no-verify`.
