import { projectUtil } from '~/utils/api'

export const useEditProjectStore = defineStore('editProject', () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const id = ref<number | null>(null)
  const title = ref('')
  const description = ref<string>('')

  const update = async () => {
    if (!id.value) {
      return await projectUtil.addProject({
        title: title.value, description: description.value,
      })
    }

    return await projectUtil.updateProject({ id: id.value, title: title.value, description: description.value })
  }

  const init = (projectId?: number) => {
    if (!projectId) {
      id.value = null
      title.value = ''
      description.value = ''

      return
    }

    id.value = projectId

    const userProject = user.value?.userProjects.find(userProject => userProject.project.id === +projectId)

    if (!userProject) {
      throw 'UserProject not found.'
    }

    const { project } = userProject

    title.value = project.title
    description.value = project.description || ''
  }

  return {
    id,
    title,
    description,
    update,
    init,
  }
})
