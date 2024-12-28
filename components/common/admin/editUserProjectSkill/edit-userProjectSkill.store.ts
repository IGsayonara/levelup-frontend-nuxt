import type { ProjectSkill } from '~/types/project'
import { UserUtil } from '~/utils/api/user.util'
import { UserProjectSkillUtil } from '~/utils/api/user-project-skill.util'
import { userProjectSkillUtil } from '~/utils/api'

export const useEditUserProjectSkill = defineStore('editUserProjectSkill', () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  const userProjectSkill = reactive<ProjectSkill>({
    id: 0,
    description: '',
  })

  const init = (userProjectId: number, projectSkillId: number) => {
    const userProjectSkills = user.value.userProjects.find(userProjectSkill => userProjectSkill.id === userProjectId)?.skills

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
