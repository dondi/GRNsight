import prettierPlugin from "eslint-plugin-prettier";
// Using a longer way of importing prettier config to avoid linting issues from classic eslint
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prettierConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, ".prettierrc.json"), "utf8")
);

export default [
  {
    ignores: [
      "node_modules/**",
      "coverage/**",
      "web-client-classic/public/js/*.min.js",
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
