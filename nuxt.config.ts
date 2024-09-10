// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

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

  modules: ['@vesp/nuxt-fontawesome'],
})