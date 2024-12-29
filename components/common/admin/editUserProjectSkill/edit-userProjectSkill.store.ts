import type { ProjectSkill } from '~/types/project'
import { userProjectSkillUtil } from '~/utils/api'
import type { UserProjectSkill } from '~/types/user-project-skill'

export const useEditUserProjectSkill = defineStore('editUserProjectSkill', () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  const userProjectSkill = reactive({
    id: 0,
    description: '',
  })

  const init = (userProjectId: number, projectSkillId: number) => {
    const userProjectSkills = user.value?.userProjects.find(userProject => userProject.id === userProjectId)?.skills as UserProjectSkill[]

    const newProjectSkill = userProjectSkills.find(projectSkill => projectSkill.id === projectSkillId)

    Object.assign(userProjectSkill, newProjectSkill)
  }

  const update = async () => {
    return await userProjectSkillUtil.updateUserProjectSkill(userProjectSkill)
  }

  const deleteUserProjectSkill = async () => {
    return await userProjectSkillUtil.deleteUserProjectSkill(userProjectSkill.id)
  }

  return {
    init,
    update,
    delete: deleteUserProjectSkill,
    ...toRefs(userProjectSkill),
  }
})
