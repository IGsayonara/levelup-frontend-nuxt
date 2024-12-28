import { userUtil } from '~/utils/api'

export const useAddUserSkill = () => {
  const addUserSkill = async (skillId: number) => {
    await userUtil.addUserSkill(skillId)
  }

  return {
    addUserSkill,
  }
}
