import { defineConfig } from 'eslint/config'
import baseConfig from '../../eslint.config.mjs'

export default defineConfig([
  ...baseConfig,
  {
    ignores: [
      '.strapi/**',
      '.tmp/**',
      'dist/**',
      '**/generated/**',
      'src/admin/**',
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        NodeJS: true,
      },
    },
    rules: {
      /*
       * TYPESCRIPT
       */
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
])
