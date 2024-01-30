module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  type: 'module',
  extends: 'eslint:recommended',
  overrides: [
    {
      env: {
        node: true,
        'jest/globals': true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: '2020',
    sourceType: 'module'
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  },
  transform: {}
}
