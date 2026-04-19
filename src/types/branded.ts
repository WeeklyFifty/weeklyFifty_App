// src/types/branded.ts
// Branded string IDs (arch §5.2). Prevents a QuizId from being accidentally
// passed where a UserId is expected.

export type QuizId = string & { readonly __brand: "QuizId" };
export type UserId = string & { readonly __brand: "UserId" };
export type QuestionId = string & { readonly __brand: "QuestionId" };

// Helpers — use sparingly, usually only at the API boundary when parsing.
export const asQuizId = (s: string): QuizId => s as QuizId;
export const asUserId = (s: string): UserId => s as UserId;
export const asQuestionId = (s: string): QuestionId => s as QuestionId;
