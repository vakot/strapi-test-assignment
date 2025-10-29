import pluginTypescript from '@typescript-eslint/eslint-plugin'
import pluginPrettier from 'eslint-plugin-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig({
  ignores: ['node_modules'],
  plugins: { '@typescript-eslint': pluginTypescript, prettier: pluginPrettier },
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
  },
})
