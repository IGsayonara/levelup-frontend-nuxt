// plugins/froala.ts
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  if (import.meta.client) {
    const { default: VueFroala } = await import('vue-froala-wysiwyg')
    nuxtApp.vueApp.use(VueFroala)
  }
})
