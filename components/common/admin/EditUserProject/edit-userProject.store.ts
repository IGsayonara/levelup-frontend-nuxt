import { userProjectUtil } from '~/utils/api'
import type { UserProjectSkill } from '~/types/user-project-skill'

export const useEditUserProjectStore = defineStore('editUserProject', () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  const userProject = reactive({
    id: 0,
    description: '',
    skills: [] as UserProjectSkill[],
    role: '',
  })

  const update = async () => {
    await userProjectUtil.updateUserProject(userProject)
  }

  const deleteUserProject = async () => {
    await userProjectUtil.deleteUserProject(userProject.id)
  }

  const init = (userProjectId: number) => {
    const newUserProject = user.value?.userProjects.find(userProject => userProject.id === userProjectId)
    Object.assign(userProject, newUserProject)
  }

  return {
    init,
    update,
    delete: deleteUserProject,
    ...toRefs(userProject),
  }
})
