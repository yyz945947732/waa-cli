module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2017
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    plugins: [
        'html'
    ],
    extends: 'standard',
    rules: {
        'semi': 0,
        'eol-last': 0,
        'no-undef': 0
    }

}
