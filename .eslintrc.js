module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    project: ['./tsconfig.json'], // Specify it only for TypeScript files
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  globals: {
    document: 'readonly',
  },
  plugins: ['import', 'prettier', 'react', 'react-hooks'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/first': ['error'],
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
    'import/order': [
      'warn',
      {
        groups: [
          'index',
          'sibling',
          'parent',
          'internal',
          'external',
          'builtin',
          'object',
          'type',
        ],
      },
    ],
    'no-console': 'warn',
    'react/prop-types': 'off',
  },
  ignorePatterns: [
    '*.min.*',
    'CHANGELOG.md',
    'dist',
    'LICENSE*',
    'output',
    'coverage',
    'public',
    'temp',
    'packages-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '__snapshots__',
    '!.github',
    '!.vitepress',
    '!.vscode',
  ],
  settings: {
    react: {
      version: '17',
    },
  },
}
