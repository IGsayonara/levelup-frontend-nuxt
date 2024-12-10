import { ProjectUtil } from '~/utils/api/project.util'

const projectUtil = new ProjectUtil()

export const useAddProjectStore = defineStore('addProject', () => {
  const title = ref('')
  const description = ref('')

  const add = async () => {
    await projectUtil.addProject({
      title: title.value, description: description.value,
    })
  }

  return {
    title, description, add,
  }
})
