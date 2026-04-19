// tests/setup.ts
// Jest setup. Mocks native modules so Node-side unit tests don't crash on
// "native module missing" invariants.

// Mock react-native-mmkv (4.x Nitro factory API) so any code that imports
// `createMMKV` during tests gets an in-memory shim.
jest.mock("react-native-mmkv", () => {
  function createMMKV() {
    const store = new Map<string, string>();
    return {
      getString: (key: string) => store.get(key),
      set: (key: string, value: string | number | boolean) => {
        store.set(key, String(value));
      },
      remove: (key: string) => store.delete(key),
      clearAll: () => {
        store.clear();
      },
      contains: (key: string) => store.has(key),
    };
  }
  return { createMMKV };
});

// Silence noisy logger output in tests.
jest.mock("@/lib/logger", () => ({
  logger: {
    breadcrumb: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));
