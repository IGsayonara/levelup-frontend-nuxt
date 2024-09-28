import type { Project } from '~/types/project'
import { ProjectUtil } from '~/utils/api/project.util'

const projectUtil = new ProjectUtil()

export const useProjectStore = defineStore('projectStore', () => {
  const project = ref<Project | null>(null)
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

  const setProject = (newValue: Project): void => {
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
