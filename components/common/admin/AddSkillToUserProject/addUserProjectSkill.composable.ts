import { UserUtil } from '~/utils/api/user.util'

const userUtil = new UserUtil()

export const useAddUserProjectSkill = () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const { fetchUser } = userStore

  const addSkillToUserProject = async (userProjectId: number, skillId: number) => {
    await userUtil.addUserProjectSkill({ userProjectId, skillId })
    await fetchUser(user.value.username)
  }

  return {
    addSkillToUserProject,
  }
}
