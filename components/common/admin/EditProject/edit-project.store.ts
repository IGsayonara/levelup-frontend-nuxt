import { ProjectUtil } from '~/utils/api/project.util'
import type { ProjectSkill } from '~/types/project'

const projectUtil = new ProjectUtil()

export const useEditProjectStore = defineStore('editProject', () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const id = ref(null)
  const title = ref('')
  const description = ref('')

  const update = async () => {
    if (!id.value) {
      return await projectUtil.addProject({
        title: title.value, description: description.value,
      })
    }

    return await projectUtil.updateProject({ id: id.value, title: title.value, description: description.value })
  }

  const init = (projectId?: string) => {
    if (!projectId) {
      id.value = null
      title.value = ''
      description.value = ''

      return
    }

    id.value = projectId

    const userProject = user.value.userProjects.find(userProject => userProject.project.id === projectId)
    const { project } = userProject

    title.value = project.title
    description.value = project.description
  }

  return {
    id,
    title,
    description,
    update,
    init,
  }
})
