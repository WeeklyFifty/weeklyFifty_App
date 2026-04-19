# docs/

This folder holds the binding architecture document and any future supplementary docs (ADRs, API contracts, runbooks).

## Files

- `weekly-fifty-architecture.md` — the architecture doc (~2,250 lines, 24 sections + 3 appendices). Authored before scaffold. Binding source of truth: when in doubt, the arch doc wins. Keep it under version control. If you change the architecture, update this doc in the same PR.

## How to navigate the architecture doc

The document is long but well-structured. Read it in this order depending on what you're doing.

### First time / onboarding

Read in order:

1. **§1 Executive summary** — one page; gives you the shape.
2. **§2 Principles** — the why behind the choices.
3. **§3 Stack** — what's in (and what's explicitly NOT in).
4. **§4 Project structure** — the folder layout you'll be navigating constantly. §4.3 (import boundaries) is enforced by ESLint.
5. **§5 Naming + code style** — internalise; mostly enforced by lint.
6. **§6 Theming** — token shape, ThemeProvider, useStyles.
7. **§21 Phased build plan** — the actual build order.

### Per-phase reading map

| Phase | Sections to read first | Key code patterns |
|---|---|---|
| **A — Skeleton** | §4, §6, §7.1 | Provider tree, route stubs, theme tokens |
| **B — Auth + API** | §9 (whole), §10 (whole) | `apiRequest`, `ApiError`, auth state machine, token store |
| **C — Quiz** | §8.2 (Query), §8.3 (Zustand persist), §11.4 (gating) | `useCurrentQuiz`, in-progress quiz store, Fifty+ paywall gate |
| **D — Subscriptions** | §11 (whole) | RevenueCatProvider init, capability map, paywall presentation |
| **E — Push + polish** | §12, §14, §17.3, §18.3, §18.4 | Token lifecycle, Sentry init, account deletion, channel registry |
| **F — Submission** | §16 (EAS), §17 (App/Play store) | Build profiles, submission checklist |

### Specific lookups

- **Where do I put X?** — §4.1 (folder map) + §4.3 (boundaries).
- **Naming?** — §5.1 table.
- **API error handling?** — §9.2.
- **What state lives where?** — §8.1 split table.
- **Persisted vs in-memory?** — §13.1 three-tier table.
- **Pre-commit hooks?** — §20.3.
- **Open questions?** — §23 (15 OQs, plus OQ-16 added in `.scaffold-plan.md` C2).
- **Phase-start prompts for Claude Code?** — Appendix A.

### Caveats / known doc-vs-scaffold deviations

The scaffold deviates from the arch doc in a few documented places. When the doc and the running scaffold disagree, the scaffold wins for these specific items only:

- **Package manager:** doc §3.4 prefers pnpm; scaffold uses npm (D1 in `.scaffold-plan.md`).
- **Sentry:** doc §14.2 imports `sentry-expo`; scaffold uses `@sentry/react-native` (modern, non-deprecated; D4).
- **Tabs:** doc §4.1 lists `home / games / shop / account`; scaffold uses `home / leaderboard / past-quizzes / settings` per user-supplied task. New OQ-16 to resolve.
- **Storage barrel:** doc §5.2 bans `index.ts` barrels; `src/lib/storage/index.ts` is a deliberate, file-header-justified exception (D3).
- **Tab bar / onboarding routes:** the user task added a `welcome` screen and an `(onboarding)` group not present in §4.1. Both are scaffolded with TODOs.

When in doubt, follow the doc and add a TODO referencing the deviation.
