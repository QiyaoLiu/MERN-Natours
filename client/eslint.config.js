import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    env: {
      browser: true, // Enables global variables for the browser environment
      es2021: true, // Enables ES2021 syntax and globals
      node: true, // Enables global variables for Node.js
    },
    extends: [
      "eslint:recommended", // Uses recommended rules from ESLint
      "plugin:react/recommended", // Uses recommended rules from eslint-plugin-react
      // Add other configurations as needed, e.g., TypeScript, Prettier
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true, // Enables JSX syntax
      },
      ecmaVersion: 12, // Specifies the ECMAScript version
      sourceType: "module", // Allows the use of imports
    },
    plugins: [
      "react", // Enables linting for React
      // Add other plugins as needed
    ],
    rules: {
      // Define custom rules or override default rules here
    },
  },
];
