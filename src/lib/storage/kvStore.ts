// src/lib/storage/kvStore.ts
// Arch §13.2. MMKV wrapper for persistent non-secret KV.
// Secrets (tokens, etc.) go through ./secureStore — NOT here.
//
// NOTE: react-native-mmkv 4.x uses a `createMMKV` factory (Nitro Modules).
// The arch doc pre-dates this change and shows `new MMKV(...)`. The behaviour
// is identical; update if/when the arch doc is refreshed.

import { createMMKV } from "react-native-mmkv";

const mmkv = createMMKV({ id: "wf.default" });

export const storage = {
  get<T = unknown>(key: string): T | null {
    const raw = mmkv.getString(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },
  set(key: string, value: unknown): void {
    mmkv.set(key, JSON.stringify(value));
  },
  delete(key: string): void {
    mmkv.remove(key);
  },
  clear(): void {
    mmkv.clearAll();
  },
};

// Zustand persist adapter — consumers import via `@/lib/storage`.
export const mmkvStorage = {
  getItem: (name: string): string | null => mmkv.getString(name) ?? null,
  setItem: (name: string, value: string): void => {
    mmkv.set(name, value);
  },
  removeItem: (name: string): void => {
    mmkv.remove(name);
  },
};
