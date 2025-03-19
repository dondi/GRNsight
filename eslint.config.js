module.exports = [
  {
    ignores: [
      'node_modules/**',
      'coverage/**'
      // Add any other paths that were in your .eslintignore
    ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'commonjs',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        // Node globals
        process: 'readonly',
        // Mocha globals
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        after: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        // jQuery
        $: 'readonly',
        jQuery: 'readonly'
      }
    },
    rules: {
      indent: ["error", 4],
      quotes: ["error", "double"],
      semi: ["error", "always"]
      // Add other rules from your old ESLint config
    }
  }
];