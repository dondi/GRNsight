module.exports = [
    {
        ignores: [
            "node_modules/**",
            "coverage/**",
            "web-client-classic/public/js/*.min.js",
            // Add these from your .eslintignore file
            "coverage/lcov-report/**",
            "_site/**",
            ".git/**",
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
            prettier: require("eslint-plugin-prettier"),
        },
        rules: {
            "prettier/prettier": "error",
            indent: "off", // Let Prettier handle indentation
            quotes: "off", // Let Prettier handle quotes
            semi: "off", // Let Prettier handle semicolons
        },
    },
];

// import js from "@eslint/js";
// import globals from "globals";
// import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";
// import { defineConfig, globalIgnores } from "eslint/config";

// export default defineConfig([
//     globalIgnores(["dist"]),
//     {
//         files: ["**/*.{js,jsx}"],
//         extends: [
//             js.configs.recommended,
//             reactHooks.configs["recommended-latest"],
//             reactRefresh.configs.vite,
//         ],
//         languageOptions: {
//             ecmaVersion: 2020,
//             globals: globals.browser,
//             parserOptions: {
//                 ecmaVersion: "latest",
//                 ecmaFeatures: { jsx: true },
//                 sourceType: "module",
//             },
//         },
//         rules: {
//             "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
//         },
//     },
// ]);
