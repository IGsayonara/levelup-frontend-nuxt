import { ProjectUtil } from '~/utils/api/project.util'
import type { UserProject } from '~/types/user'

const projectUtil = new ProjectUtil()

export const useProjectStore = defineStore('projectStore', () => {
  const project = ref<UserProject | null>(null)
  const isLoading = ref(false)
  const isError = ref(false)

  const loadProject = async (id: number) => {
    try {
      isLoading.value = true
      project.value = await projectUtil.loadProject(id)
    }
    catch {
      isError.value = true
    }
    finally {
      isLoading.value = false
    }
  }

  const setProject = (newValue: UserProject): void => {
    project.value = newValue
  }

  return {
    project,
    isLoading,
    isError,
    loadProject,
    setProject,
  }
})
