import { ProjectUtil } from '~/utils/api/project.util'
import type { ProjectSkill } from '~/types/project'

const projectUtil = new ProjectUtil()

export const useEditUserProjectStore = defineStore('editUserProject', () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  const userProject = reactive({
    id: 0,
    description: '',
    skills: [],
    role: '',
  })

  const update = async () => {
    await projectUtil.updateUserProject(userProject)
  }

  const init = (userProjectId: number) => {
    const newUserProject = user.value.userProjects.find(userProject => userProject.id === userProjectId)
    console.log(newUserProject)
    Object.assign(userProject, newUserProject)
  }

  return {
    init,
    update,
    ...toRefs(userProject),
  }
})
