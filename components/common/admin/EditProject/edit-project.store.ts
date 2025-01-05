import { useNuxtApp } from '#app'

export const useEditProjectStore = defineStore('editProject', () => {
  const { $api } = useNuxtApp()
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const id = ref<number | null>(null)
  const title = ref('')
  const description = ref<string>('')

  const update = async () => {
    if (!id.value) {
      throw 'Not Implemented'
    }

    return await $api.projects.projectControllerUpdateOne(id.value, { title: title.value, description: description.value })
  }

  const init = (projectId?: number) => {
    if (!projectId) {
      id.value = null
      title.value = ''
      description.value = ''

      return
    }

    id.value = projectId

    const userProject = user.value?.userProjects.find(userProject => +userProject.project.id === +projectId)

    if (!userProject) {
      throw 'UserProject not found.'
    }

    const { project } = userProject

    title.value = project.title
    description.value = project.description || ''
  }

  const updateProjectImage = async (file: File) => {
    if (id.value) {
      await $api.projects.projectControllerUpdateProjectImage(id.value, { file })
    }
  }

  return {
    id,
    title,
    description,
    update,
    updateProjectImage,
    init,
  }
})
