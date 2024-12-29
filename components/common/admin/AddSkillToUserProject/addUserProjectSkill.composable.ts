import { userProjectSkillUtil } from '~/utils/api'

export const useAddUserProjectSkill = () => {
  const userStore = useUserStore()
  const { fetchUser, user } = userStore

  const addSkillToUserProject = async (userProjectId: number, skillId: number) => {
    await userProjectSkillUtil.addUserProjectSkill({ userProjectId, skillId })

    await fetchUser(user?.username as string)
  }

  return {
    addSkillToUserProject,
  }
}
