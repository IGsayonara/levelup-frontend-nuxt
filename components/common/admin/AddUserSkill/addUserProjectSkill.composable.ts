import { UserUtil } from '~/utils/api/user.util'

const userUtil = new UserUtil()

export const useAddUserSkill = () => {
  const addUserSkill = async (skillId: number) => {
    await userUtil.addUserSkill(skillId)
  }

  return {
    addUserSkill,
  }
}
