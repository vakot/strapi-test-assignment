import pluginTypescript from '@typescript-eslint/eslint-plugin'
import pluginImport from 'eslint-plugin-import'
import pluginPrettier from 'eslint-plugin-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['node_modules/**', 'eslint']),
  {
    plugins: {
      '@typescript-eslint': pluginTypescript,
      prettier: pluginPrettier,
      import: pluginImport,
    },
    rules: {
      /*
       * RECOMMENDED
       */
      ...pluginPrettier.configs.recommended.rules,
      ...pluginTypescript.configs.recommended.rules,

      /*
       * PRETTIER
       */
      'prettier/prettier': 'warn',

      /*
       * TYPESCRIPT
       */
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      /*
       * STYLES
       */
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['../../*', '!../../eslint.config.mjs'],
              message: `Use an alias import instead of long relative paths (../../)`,
            },
          ],
        },
      ],
    },
  },
])
