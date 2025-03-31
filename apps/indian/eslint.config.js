import { nextJsConfig } from '@repo/eslint-config/next-js'

/** @type {import("eslint").Linter.Config} */
export default {
  ...nextJsConfig,
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json'
      }
    }
  }
}
