import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginTS from '@typescript-eslint/eslint-plugin'
import eslintParserTS from '@typescript-eslint/parser'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  {
    files: ['**/*.ts', '**/*.tsx'], // Apply only to TypeScript files
    ignores: ['node_modules', 'dist'], // Ignore these folders
    languageOptions: {
      parser: eslintParserTS,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      react: eslintPluginReact,
      '@typescript-eslint': eslintPluginTS,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
]
