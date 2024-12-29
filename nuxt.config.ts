// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'node:path'
import checker from 'vite-plugin-checker'
import eslintPlugin from 'vite-plugin-eslint'

export default defineNuxtConfig({

  modules: [
    '@vesp/nuxt-fontawesome',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxt/image',
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  devtools: { enabled: true },

  css: [
    'froala-editor/css/froala_editor.pkgd.min.css',
    'froala-editor/css/froala_style.min.css',
  ],

  alias: {
    cookie: resolve(__dirname, 'node_modules/cookie'),
  },

  devServer: {
    port: 8080,
  }, compatibilityDate: '2024-04-03',

  vite: {
    plugins: [
      checker({
        // typescript: true,
        vueTsc: true,
      }),
    ],
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

  typescript: {
    strict: true,
    typeCheck: true,

    // Enforces TypeScript checks during development
  },

  eslint: {
    config: {
      stylistic: true,
    },
    checker: true,
  },

  pinia: {
    storesDirs: ['./stores/**/*.ts'],
  },

})
