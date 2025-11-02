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

      /*
       * IMPORT ORDER
       */
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal'],
            ['parent', 'sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: '@**',
              group: 'internal',
              position: 'after',
            },
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
])
