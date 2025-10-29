import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import { defineConfig } from 'eslint/config'
import baseConfig from '../../eslint.config.mjs'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...baseConfig,
  {
    rules: {
      /*
       * TYPESCRIPT
       */
      // NOTE: to allow empty props interfaces for components.
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
])

export default eslintConfig
