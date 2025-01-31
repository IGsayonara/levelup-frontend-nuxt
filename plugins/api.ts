import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { Api } from '~/generated-api/Api'

export type BearerTokenSecurity = {
  token?: string | null
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const apiInstance = new Api<BearerTokenSecurity>({
    securityWorker(data) {
      if (!data) return

      return {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    },
    baseURL: config.apiBaseUrl || config.public.apiBaseUrl,
  })

  return {
    provide: {
      api: apiInstance,
    },
  }
})
