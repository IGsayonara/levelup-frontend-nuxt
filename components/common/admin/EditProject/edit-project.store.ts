import { ProjectUtil } from '~/utils/api/project.util'
import type { ProjectSkill } from '~/types/project'

const projectUtil = new ProjectUtil()

export const useEditProjectStore = defineStore('editProject', () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const id = ref(null)
  const title = ref('')
  const description = ref('')
  const projectSkills = ref<ProjectSkill[]>([])

  const update = async () => {
    await projectUtil.updateProject({ id: id.value, title: title.value, description: description.value })
  }

  const init = (projectId: string) => {
    id.value = projectId

    const userProject = user.value.userProjects.find(userProject => userProject.project.id === projectId)
    const { project } = userProject

    title.value = project.title
    description.value = project.description
    projectSkills.value = [...userProject.skills]
  }

  return {
    title,
    description,
    projectSkills,
    update,
    init,
  }
})
