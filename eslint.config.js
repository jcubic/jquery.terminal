const globals = require('globals');

// Flat config migrated from the eslintConfig that used to live in package.json.
// The linted files (js/*.js source) are ES5.
module.exports = [
    {
        // ESLint 9 flat config reports unused eslint-disable directives by
        // default - eslintrc (ESLint 8) did not, so keep the old behavior
        linterOptions: {
            reportUnusedDisableDirectives: 'off'
        },
        languageOptions: {
            ecmaVersion: 5,
            sourceType: 'script',
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jasmine,
                jQuery: 'writable',
                sprintf: 'writable',
                $: 'writable',
                Symbol: 'writable'
            }
        },
        rules: {
            'no-console': 'error',
            'eqeqeq': 'error',
            'curly': 'error',
            'no-unreachable': 'error',
            'valid-typeof': 'error',
            'no-unexpected-multiline': 'error',
            'no-regex-spaces': 'error',
            'no-irregular-whitespace': 'error',
            'no-invalid-regexp': 'error',
            'no-inner-declarations': 'error',
            'no-func-assign': 'error',
            'no-extra-semi': 'error',
            'no-extra-boolean-cast': 'error',
            'no-debugger': 'error',
            'no-dupe-args': 'error',
            'no-dupe-keys': 'error',
            'no-duplicate-case': 'error',
            'no-empty-character-class': 'error',
            'no-ex-assign': 'error',
            'array-callback-return': 'error',
            'no-case-declarations': 'error',
            'guard-for-in': 'error',
            'no-caller': 'error',
            'no-empty-function': 'error',
            'no-extend-native': 'error',
            'no-extra-bind': 'error',
            'no-fallthrough': 'error',
            'no-global-assign': 'error',
            'no-implicit-globals': 'error',
            'no-implied-eval': 'error',
            'no-multi-spaces': 'error',
            'no-new-wrappers': 'error',
            'no-redeclare': 'error',
            'no-self-assign': 'error',
            'no-return-assign': 'error',
            'no-self-compare': 'error',
            'no-throw-literal': 'error',
            'no-unused-labels': 'error',
            'no-useless-call': 'error',
            'no-useless-escape': 'error',
            'no-void': 'error',
            'no-with': 'error',
            'radix': 'error',
            'wrap-iife': ['error', 'inside'],
            'yoda': ['error', 'never'],
            'no-catch-shadow': 'error',
            'no-delete-var': 'error',
            'no-label-var': 'error',
            'no-undef-init': 'error',
            // ESLint 9 changed the caughtErrors default from 'none' to 'all';
            // keep 'none' so unused catch bindings are not flagged as before
            'no-unused-vars': ['error', {caughtErrors: 'none'}],
            'no-undef': 'error',
            'comma-style': ['error', 'last'],
            'comma-dangle': ['error', 'never'],
            'comma-spacing': ['error', {before: false, after: true}],
            'computed-property-spacing': ['error', 'never'],
            'eol-last': ['error', 'always'],
            'func-call-spacing': ['error', 'never'],
            'key-spacing': ['error', {beforeColon: false, afterColon: true, mode: 'strict'}],
            'max-len': ['error', 90],
            'max-statements-per-line': 'error',
            'new-parens': 'error',
            'no-array-constructor': 'error',
            'no-lonely-if': 'error',
            'no-mixed-spaces-and-tabs': 'error',
            'no-multiple-empty-lines': 'error',
            'no-new-object': 'error',
            'no-tabs': 'error',
            'no-trailing-spaces': 'error',
            'no-whitespace-before-property': 'error',
            'object-curly-spacing': ['error', 'never'],
            'space-before-blocks': 'error',
            'keyword-spacing': ['error', {before: true, after: true}],
            'space-in-parens': ['error', 'never'],
            'space-infix-ops': 'error',
            'space-before-function-paren': ['error', 'never'],
            'complexity': ['error', {max: 30}],
            'indent': ['error', 4, {SwitchCase: 1}],
            'linebreak-style': ['error', 'unix'],
            'semi': ['error', 'always']
        }
    }
];
