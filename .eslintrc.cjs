/**
 * ESLint config for the WovenHaat Vite + React app.
 * Run with `npm run lint` (adds --max-warnings 0 so CI-style runs fail loudly).
 */
module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true }
  },
  settings: { react: { version: "detect" } },
  plugins: ["react", "react-hooks", "react-refresh"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended"
  ],
  ignorePatterns: ["dist", "node_modules", "legacy"],
  rules: {
    // Props are documented with JSDoc in this codebase, not PropTypes.
    "react/prop-types": "off",
    // react-refresh wants every file to export only components; allow hooks/constants.
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }]
  }
};
