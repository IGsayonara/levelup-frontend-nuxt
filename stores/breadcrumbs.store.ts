import type { Breadcrumb } from '~/types/breadcrumbs'

export const useBreadcrumbsStore = defineStore('Breadcrumbs', () => {
  const breadcrumbs = ref<Breadcrumb[] | null>()
  const setBreadcrumbs = (value: Breadcrumb[] | null): void => {
    breadcrumbs.value = value
  }

  return {
    breadcrumbs,
    setBreadcrumbs,
  }
})
