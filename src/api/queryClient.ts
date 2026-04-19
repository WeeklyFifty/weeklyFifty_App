// src/api/queryClient.ts
// Arch §8.2. Single QueryClient with retry rules that respect our ApiError
// codes. 4xx (except rate-limit/conflict cases) should not retry.

import { QueryClient } from "@tanstack/react-query";

import { ApiError } from "./errors";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: (failureCount, err) => {
        if (err instanceof ApiError && [401, 403, 404].includes(err.status)) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
    mutations: { retry: false },
  },
});
