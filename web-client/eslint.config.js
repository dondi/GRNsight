import prettierPlugin from "eslint-plugin-prettier";
import { readFileSync } from "node:fs";

const prettierConfig = JSON.parse(
  readFileSync(new URL("./.prettierrc.json", import.meta.url), "utf8")
);

export default [
  {
    ignores: [
      "node_modules/**",
      "coverage/**",
      "web-client-classic/**",
      "coverage/lcov-report/**",
      "_site/**",
      ".git/**",
      "**/.vite/**",
      "**/dist/**",
    ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        process: "readonly",
        describe: "readonly",
        it: "readonly",
        before: "readonly",
        after: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        $: "readonly",
        jQuery: "readonly",
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": ["error", prettierConfig],
      indent: "off", // Let Prettier handle indentation
      quotes: "off", // Let Prettier handle quotes
      semi: "off", // Let Prettier handle semicolons
    },
  },
];
