import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "./.prettierrc";

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
