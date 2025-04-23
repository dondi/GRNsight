module.exports = [
    {
        ignores: [
            "node_modules/**",
            "coverage/**",
        ],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",  // IMPORTANT: Use 'module' not 'commonjs'
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
            }
        },
        rules: {
            indent: ["error", 4],
            quotes: ["error", "double"],
            semi: ["error", "always"],
            // Other rules can remain the same
        }
    }
];
