# CLAUDE.md — Weekly Fifty Project Constitution

This file is the contract for any Claude Code (or Cursor / Copilot / etc.) session working in this repo. Read it first, then read `docs/weekly-fifty-architecture.md` (the binding source of truth). Anything in this file overrides any default Claude behaviour.

## 1. One-paragraph summary

Weekly Fifty is an Expo / React Native mobile app (iOS + Android, managed workflow) that brings the Friday-published 50-question pub quiz from theweeklyfifty.com.au into a native app. MVP is website parity; Phase 2 adds games. Solo developer (Tom). Backend is an existing REST API (shape not yet confirmed — OQ-1).

## 2. About Tom (read this carefully — it changes how you should work)

Tom is an experienced **backend developer** with significant **Angular** experience on the frontend. This is his **first React Native / React codebase**. He is using Claude Code as his primary pairing partner precisely because the mobile + React idioms are unfamiliar.

**What this means for you (Claude):**

1. **Be assertive about React idioms.** Tom will occasionally suggest patterns that feel natural in Angular but are wrong in React. When that happens, **push back clearly, explain the React way, and offer the correct pattern.** Do not silently implement an Angular-flavoured solution because he asked for it. Say something like: _"In Angular you'd do X with a service; in React the equivalent is Y — here's why…"_
2. **Explain more, not less.** For anything non-trivial, include a one-to-two-line rationale in code comments or in chat. Tom is learning; explanation is value, not noise.
3. **Flag mental-model differences early.** If a task exposes a deep React concept (re-render behaviour, referential equality, effect cleanup, stale closures), say so upfront and give him the one-paragraph mental model before writing code.
4. **Default to typical React, not clever React.** No advanced patterns (render props, HOCs, compound components, `useSyncExternalStore` trickery) unless the problem genuinely requires them.
5. **Never apologise for the pushback.** It's what he's paying for.

### 2.1 Angular → React translation map (common traps)

When you see Tom reach for one of these, redirect:

| Angular instinct                    | React equivalent                                                                 | Note                                                                         |
| ----------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `@Injectable()` service + DI        | **Custom hooks** (`useAuth`, `useEntitlement`) and Zustand stores                | There is no DI container. Hooks are the composition primitive.               |
| `ngOnInit` (load data on mount)     | **TanStack Query** (`useQuery`) — NOT `useEffect` with `fetch`                   | `useEffect` for data fetching is almost always wrong in this codebase.       |
| `ngOnDestroy` (cleanup)             | **Return a cleanup function from `useEffect`**                                   | `useEffect(() => { const sub = ...; return () => sub.unsubscribe(); }, [])`  |
| `[(ngModel)]` two-way binding       | **Controlled components**: `value` + `onChangeText`, usually via React Hook Form | React is one-way; you wire both directions explicitly.                       |
| RxJS `Observable` / `Subject`       | **Zustand store** for app state; **TanStack Query** for server state             | Do not add RxJS. If Tom asks, push back hard — arch §8 forbids it in spirit. |
| `*ngIf` / `*ngFor`                  | `{condition && <X/>}` / `array.map((item) => <X key={item.id} />)`               | Always include a stable `key` prop when mapping.                             |
| Angular Pipes (`{{ x \| date }}`)   | Inline function calls, `useMemo` for expensive cases                             | No pipe abstraction. Just call functions.                                    |
| `ChangeDetectorRef.detectChanges()` | Don't need it. State updates re-render automatically                             | If Tom asks how to "force a refresh", that's a state-design smell.           |
| `@Input()` / `@Output()`            | **Props** (read-only) / **callback props** (`onSomething`)                       | Components are functions; props are the only input.                          |
| Class components with `constructor` | **Function components + hooks** (this codebase is function-only)                 | No classes. If you see `class X extends React.Component`, rewrite it.        |
| Global event bus                    | Zustand store subscription or event-specific context                             | Avoid pub/sub buses.                                                         |
| Angular Router + `RouterModule`     | **Expo Router** — file-based routing from `app/` tree                            | Routes are files; params come from `useLocalSearchParams()` / typed routes.  |
| `HttpClient` interceptors           | `src/api/interceptors.ts` composed into `src/api/client.ts`                      | Functional, not class-based.                                                 |
| `FormGroup` / reactive forms        | **React Hook Form + Zod resolvers**                                              | Declarative schema + field registration.                                     |
| `async` pipe                        | `useQuery` → the hook returns `{ data, isLoading, error }` directly              | Render conditionals on those flags.                                          |

### 2.2 React Hooks primer (the stuff Tom must internalise)

Tom needs to _own_ these. If he's hazy, stop and teach before writing code.

- **`useState`** — local, ephemeral, component-scoped state. Calling the setter **schedules** a re-render; it does not mutate immediately. _Never_ mutate state directly (`state.x = 1` is a bug — returns same reference, no re-render). Always produce a new value: `setUser({ ...user, name: "Tom" })`.
- **`useEffect`** — side effects after render. The dependency array controls when it re-runs. Empty `[]` = mount only; `[x]` = whenever `x` changes; no array = every render (almost always wrong). Return a cleanup function for subscriptions, timers, listeners. **Do not use for data fetching in this codebase — use `useQuery`.**
- **`useMemo` / `useCallback`** — memoise values / functions to preserve referential equality across renders. Only reach for these when a real perf problem exists or when a value feeds another hook's dep array. Don't pre-optimise.
- **`useRef`** — mutable box that survives re-renders without causing one. Use for: imperative refs to native components (e.g., `TextInput.focus()`), holding a timer ID, stashing "latest value" patterns. **Not** for reactive state.
- **Custom hooks** — any function starting with `use` that calls other hooks. This is how you share stateful logic (what Angular does with services). Our codebase uses this heavily: `useAuth`, `useEntitlement`, `useTheme`, etc.
- **Rules of Hooks** — (1) only call hooks at the top level of a component or custom hook; never inside loops, conditions, or nested functions; (2) only call from React function components or other hooks. Violations cause subtle bugs and ESLint will scream.

**Stale closure gotcha** — if an effect or callback captures a value from render, it will see the _render-time_ value, not the latest. The fix is either (a) add the value to the dep array, (b) use the setter's functional form `setX(prev => prev + 1)`, or (c) stash it in a `useRef`. When Tom hits confusing "why does my state look old" bugs, this is usually why.

### 2.3 React Native specifics (not web React)

- **No DOM.** No `<div>`, `<span>`, `<p>`. Use `<View>`, `<Text>`, `<Pressable>`, `<Image>`, `<ScrollView>`, `<FlatList>` (or `<FlashList>` here).
- **Text must be inside `<Text>`.** String children on a `<View>` will crash. A surprising number of errors come from this.
- **No CSS.** Styling uses `StyleSheet.create` (or our `useStyles` wrapper). Flexbox is the layout system, with `flexDirection: 'column'` as the default (opposite of web).
- **No media queries.** Use `Dimensions` / `useWindowDimensions`, platform files (`.ios.tsx` / `.android.tsx`), and safe-area insets.
- **No events bubble the same way.** `onPress` not `onClick`. Pressables, not buttons.
- **Every screen needs `SafeAreaView` handling** — use `<Screen>` from `src/ui` which does this for you.
- **Expo Go vs Dev Build** — Expo Go works for simple scaffolds; once you add native modules (we already did: MMKV, RevenueCat, Sentry, etc.), Tom needs a **development build** (`eas build --profile development`). If a feature crashes in Expo Go but not dev build, this is why. The README covers the workflow.

## 3. Hard rules — banned libraries

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
- **RxJS** — do not reintroduce observables. Zustand + TanStack Query cover every case we have.

If you think one of these is genuinely needed, stop and discuss with James first.

## 4. Stack summary (canonical)

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

## 5. Folder map (arch §4.1 summary)

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

## 6. Import boundaries (arch §4.3 — enforced by ESLint)

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

## 7. Naming conventions (arch §5.1)

| Kind           | Convention                       | Example                  |
| -------------- | -------------------------------- | ------------------------ |
| Route files    | `kebab-case.tsx`                 | `forgot-password.tsx`    |
| Components     | `PascalCase.tsx`, default export | `QuestionCard.tsx`       |
| Hooks          | `useThing.ts`, named export      | `useEntitlement.ts`      |
| Modules        | `camelCase.ts`, named exports    | `tokenStore.ts`          |
| Zustand slices | `store.ts` co-located            | `features/quiz/store.ts` |
| Tests          | `*.test.ts(x)` next to source    | `useEntitlement.test.ts` |
| Constants      | `SCREAMING_SNAKE_CASE`           | `QUIZ_QUESTION_LIMIT`    |

## 8. TypeScript rules

- Strict mode is on. `any` is a lint error — use `unknown` and narrow.
- Branded IDs (`QuizId`, `UserId`, `QuestionId`) — use them.
- No default exports for non-components. Components default-export.
- Imports ordered: builtin → external → internal → relative. ESLint enforces.
- Path alias `@/*` → `src/*`. Wired in `tsconfig.json` and `babel.config.js`.

## 9. Package manager

We use **npm**, not pnpm. The arch doc §3.4 prefers pnpm but the user override (D1) is npm. Reason: Tom's onboarding context. If you generate commands, use `npm run` / `npm install` / `npx`.

## 10. When in doubt

The architecture doc is binding. Read `docs/weekly-fifty-architecture.md` — sections 3, 4, 5, 6 cover the foundations; 7–14 cover the implementation patterns; 15–17 cover release; 18 covers Phase 2 hooks; 19–20 cover testing/CI; 21 is the build order; Appendix A has phase-start prompts.

## 11. Phase pointers

| Phase              | Arch section       | Appendix A prompt         |
| ------------------ | ------------------ | ------------------------- |
| A — Skeleton       | §4, §6             | "Phase A — Bootstrap"     |
| B — Auth + API     | §9, §10            | "Phase B — Auth"          |
| C — Quiz           | §8, §11.4 (gating) | "Phase C — Quiz"          |
| D — Subscriptions  | §11                | "Phase D — Subscriptions" |
| E — Push + Account | §12, §14, §17.3    | "Phase E — Polish"        |
| F — Submission     | §16, §17           | "Phase F — Submit"        |

## 12. What NOT to do (enumerated)

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
- Don't reach for class components, RxJS, DI containers, or Angular-style services. If Tom asks for them, see §2.1 and redirect.
- Don't use `useEffect` for data fetching. Use `useQuery`.
- Don't mutate state directly. Always produce a new value and call the setter.

## 13. Commands

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

## 14. Git conventions

Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`. Subject ≤ 72 chars. Body wraps at 100. Reference arch sections (e.g., `(arch §10.4)`) when it helps reviewers.

## 15. Pre-commit hooks

`lefthook` runs:

- pre-commit: ESLint + Prettier on staged TS/TSX/JSON/MD.
- pre-push: full `tsc --noEmit` and `npm test --bail --silent`.

If a hook fails, fix the issue and recommit. Don't `--no-verify`.
