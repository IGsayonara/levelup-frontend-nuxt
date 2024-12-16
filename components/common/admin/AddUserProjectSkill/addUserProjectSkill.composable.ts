import { UserUtil } from '~/utils/api/user.util'

const userUtil = new UserUtil()

export const useAddUserProjectSkill = () => {
  const addSkillToUserProject = async (userProjectId: number, skillId: number) => {
    await userUtil.addUserProjectSkill({ userProjectId, skillId })
  }

  return {
    addSkillToUserProject,
  }
}
