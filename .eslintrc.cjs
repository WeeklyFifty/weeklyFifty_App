// .eslintrc.cjs
// Legacy-config ESLint setup. Weekly Fifty uses the classic .eslintrc.cjs
// because eslint-config-expo ships both formats and the legacy form is
// simpler to reason about for a solo dev. If we later migrate to the flat
// config, mirror the rules below.

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  env: {
    node: true,
    es2022: true,
    jest: true,
  },
  extends: [
    "expo",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "import", "react-native-a11y"],
  settings: {
    "import/resolver": {
      typescript: { alwaysTryTypes: true },
      node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    // Enforce the import boundaries from arch §4.3.
    // - ui is dumb: only theme + lib.
    // - lib is leaf: imports from nothing inside src/ except other src/lib/.
    // - src/features/<x> may not import from src/features/<y> (cross-feature ban).
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          // ui may only depend on theme and lib
          { target: "./src/ui", from: "./src/features" },
          { target: "./src/ui", from: "./src/api" },
          { target: "./src/ui", from: "./src/auth" },
          { target: "./src/ui", from: "./src/entitlements" },
          { target: "./src/ui", from: "./src/notifications" },
          { target: "./src/ui", from: "./src/analytics" },
          { target: "./src/ui", from: "./src/content" },
          { target: "./src/ui", from: "./src/config" },
          // lib is leaf — block every other src sibling
          { target: "./src/lib", from: "./src/features" },
          { target: "./src/lib", from: "./src/api" },
          { target: "./src/lib", from: "./src/auth" },
          { target: "./src/lib", from: "./src/entitlements" },
          { target: "./src/lib", from: "./src/notifications" },
          { target: "./src/lib", from: "./src/analytics" },
          { target: "./src/lib", from: "./src/ui" },
          { target: "./src/lib", from: "./src/theme" },
          { target: "./src/lib", from: "./src/content" },
          { target: "./src/lib", from: "./src/config" },
          { target: "./src/lib", from: "./src/types" },
          // Cross-feature isolation (arch §4.3): a feature may not import
          // from a sibling feature. The `except: ["./"]` allows self-imports
          // within the same feature directory.
          {
            target: "./src/features/*",
            from: "./src/features/*",
            except: ["./"],
          },
        ],
      },
    ],
  },
  ignorePatterns: [
    "node_modules/",
    "ios/",
    "android/",
    ".expo/",
    "dist/",
    "coverage/",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js",
    "*.config.js",
  ],
};
