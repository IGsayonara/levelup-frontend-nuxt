import type { ProjectSkill } from '~/types/project'
import { UserUtil } from '~/utils/api/user.util'

const userUtil = new UserUtil()

export const useEditUserProjectSkill = defineStore('editUserProjectSkill', () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  const userProjectSkill = reactive<ProjectSkill>({
    id: 0,
    description: '',
  })

  const init = (projectId: number, projectSkillId: number) => {
    const userProjectSkills = user.value.userProjects.find(userProjectSkill => userProjectSkill.project.id === projectId)?.skills

    const newProjectSkill = userProjectSkills.find(projectSkill => projectSkill.id === projectSkillId)

    Object.assign(userProjectSkill, newProjectSkill)
  }

  const update = async () => {
    return await userUtil.updateUserProjectSkill(userProjectSkill)
  }

  return {
    init,
    update,
    ...toRefs(userProjectSkill),
  }
})
