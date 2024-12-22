import type { UserProject } from '~/types/user'
import { UserUtil } from '~/utils/api/user.util'

const userUtil = new UserUtil()

export const useEditUserSkillStore = defineStore('editUserSkill', () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const { fetchUser } = userStore
  const userProjects = ref<UserProject[]>([])
  const userSkill = reactive({
    id: 0,
    description: '',
  })

  const update = async () => {

  }

  const deleteUserSkill = async () => {
    await userUtil.deleteUserSkill(userSkill.id)
    await fetchUser(user.value.username)
  }

  const init = (userSkillId: number) => {
    const newUserSkill = user.value.userSkills.find(userSkill => userSkill.id === userSkillId)
    Object.assign(userSkill, newUserSkill)

    const skillId = user.value.userSkills.find(userSkill => userSkill.id === userSkillId).skill.id
    userProjects.value = user.value.userProjects
      .filter((userProject) => {
        return userProject.skills.findIndex(userProjectSkill => userProjectSkill.skill.id === skillId) >= 0
      })
  }

  return {
    ...toRefs(userSkill),
    userProjects,
    deleteUserSkill,
    update,
    init,
  }
})
