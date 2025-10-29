import parserTypescript from '@typescript-eslint/parser'
import { defineConfig, globalIgnores } from 'eslint/config'
import baseConfig from '../../eslint.config.mjs'

export default defineConfig([
  ...baseConfig,
  globalIgnores(['.strapi/**', '.tmp/**', 'dist/**', '**/generated/**']),
  {
    languageOptions: { parser: parserTypescript, globals: { NodeJS: true } },
    rules: {
      /*
       * TYPESCRIPT
       */
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
])
