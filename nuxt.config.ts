// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "node:path"


export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  alias: {
    cookie: resolve(__dirname, "node_modules/cookie")
  },

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
    port: 8080
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  modules: ['@vesp/nuxt-fontawesome', '@pinia/nuxt'],

  pinia: {
    storesDirs: ['./stores/**'],
  },

})