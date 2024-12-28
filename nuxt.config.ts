// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'node:path'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  typescript: {
    strict: true, // Enforces TypeScript checks during development
  },

  alias: {
    cookie: resolve(__dirname, 'node_modules/cookie'),
  },

  css: [
    'froala-editor/css/froala_editor.pkgd.min.css',
    'froala-editor/css/froala_style.min.css',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import 'bootstrap-scss/_functions.scss';
          @import 'bootstrap-scss/_mixins.scss';
          @import 'bootstrap-scss/_variables.scss';
          @import 'bootstrap-scss/_variables-dark.scss';
          @import '~/styles/global-colors.scss';
        `,
        },
      },
    },
  },

  devServer: {
    port: 8080,
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  modules: [
    '@vesp/nuxt-fontawesome',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxt/image',
  ],

  pinia: {
    storesDirs: ['./stores/**/*.ts'],
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

})
