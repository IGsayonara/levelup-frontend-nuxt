// @ts-check

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'warn',
  },
})
