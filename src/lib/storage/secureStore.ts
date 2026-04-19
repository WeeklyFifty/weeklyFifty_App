// src/lib/storage/secureStore.ts
// Thin wrapper over expo-secure-store. Only for secrets (tokens, PII).
// Everything else lives in MMKV (./kvStore).
//
// TODO(Phase B): `tokenStore` (access/refresh tokens) lives in src/auth/
// per arch §10.3 and consumes this module.

import * as SecureStore from "expo-secure-store";

export const secureStore = {
  async get(key: string): Promise<string | null> {
    return SecureStore.getItemAsync(key);
  },
  async set(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  },
  async delete(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  },
};
