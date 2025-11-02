import pluginTypescript from '@typescript-eslint/eslint-plugin'
import parserTypescript from '@typescript-eslint/parser'
import pluginPrettier from 'eslint-plugin-prettier'
import { globalIgnores, defineConfig } from 'eslint/config'

export default defineConfig([
  globalIgnores(['**/node_modules/**']),
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs,mts}'],
    languageOptions: {
      parser: parserTypescript,
      parserOptions: {
        project: './tsconfig.base.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTypescript,
      prettier: pluginPrettier,
    },
    rules: {
      /*
       * Recommended
       */
      ...pluginTypescript.configs.recommended.rules,
      ...pluginPrettier.configs.recommended.rules,

      /*
       * Prettier
       */
      'prettier/prettier': 'warn',

      /*
       * Typescript
       */
      '@typescript-eslint/consistent-type-exports': [
        'error',
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],

      /*
       * Imports
       */
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: [
                '../../*',
                '!../../eslint.config.mjs',
                '!../../tsconfig.base.json',
              ],
              message: `Use an alias import instead of long relative paths (../../)`,
            },
          ],
        },
      ],
    },
  },
])
