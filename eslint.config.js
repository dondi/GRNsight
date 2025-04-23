module.exports = [
    {
        ignores: [
            "node_modules/**",
            "coverage/**",
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
            }
        },
        rules: {
            indent: ["error", 4],
            quotes: ["error", "double"],
            semi: ["error", "always"],
        }
    }
];
