// src/api/keys.ts
// Centralised TanStack Query keys (arch §8.2).

import type { QuizId } from "@/types/branded";

export interface ArchiveFilters {
  page?: number;
  year?: number;
}

export const qk = {
  quiz: {
    all: ["quiz"] as const,
    current: () => [...qk.quiz.all, "current"] as const,
    byId: (id: QuizId) => [...qk.quiz.all, id] as const,
    archive: (filters?: ArchiveFilters) => [...qk.quiz.all, "archive", filters ?? {}] as const,
  },
  user: {
    me: () => ["user", "me"] as const,
  },
  leaderboard: {
    forQuiz: (id: QuizId) => ["leaderboard", id] as const,
  },
} as const;
