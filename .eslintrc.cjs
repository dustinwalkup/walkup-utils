module.exports = {
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
  ignorePatterns: [
    '.eslintrc.cjs',
    'rollup.config.mjs',
    'vitest.config.ts',
    'dist/',
  ],
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.eslint.json',
    warnOnUnsupportedTypeScriptVersion: false,
    ignorePatterns: ['dist'],
  },
};
