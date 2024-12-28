import { userProjectSkillUtil } from '~/utils/api'

export const useAddUserProjectSkill = () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const { fetchUser } = userStore

  const addSkillToUserProject = async (userProjectId: number, skillId: number) => {
    await userProjectSkillUtil.addUserProjectSkill({ userProjectId, skillId })
    await fetchUser(user.value.username)
  }

  return {
    addSkillToUserProject,
  }
}
