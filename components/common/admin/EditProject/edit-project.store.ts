import { ProjectUtil } from '~/utils/api/project.util'

const projectUtil = new ProjectUtil()

export const useEditProjectStore = ('editProject', () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const id = ref(null)
  const title = ref('')
  const description = ref('')
  const update = async () => {
    await projectUtil.updateProject({ id: id.value, title: title.value, description: description.value })
  }

  const init = (projectId: string) => {
    id.value = projectId
    title.value = 'test'
    description.value = 'test'
  }

  return {
    title,
    description,
    update,
    init,
  }
})
