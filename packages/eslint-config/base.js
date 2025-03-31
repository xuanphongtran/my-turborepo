import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import onlyWarn from 'eslint-plugin-only-warn'
import unusedImports from 'eslint-plugin-unused-imports'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  tseslint.configs.recommended,
  {
    parser: tsParser, // Ensure TypeScript parser is set
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      project: './tsconfig.json' // Ensure the correct tsconfig is used
    },
    plugins: {
      '@typescript-eslint': tseslint,
      turbo: turboPlugin,
      'unused-imports': unusedImports
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
      'unused-imports/no-unused-imports': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }]
    }
  },
  {
    plugins: {
      onlyWarn
    }
  },
  {
    ignores: ['dist/**']
  }
]
