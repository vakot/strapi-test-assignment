import parserTypescript from '@typescript-eslint/parser'
import { defineConfig } from 'eslint/config'
import baseConfig from '../../eslint.config.mjs'

export default defineConfig([
  ...baseConfig,
  {
    ignores: ['dist/**', 'build/**', '.cache/**', '.tmp/**'],
    languageOptions: { parser: parserTypescript, globals: { NodeJS: true } },
    rules: {
      /*
       * TYPESCRIPT
       */
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
])
