import { userSkillUtil } from '~/utils/api'

export const useAddUserSkill = () => {
  const addUserSkill = async (skillId: number) => {
    await userSkillUtil.addUserSkill(skillId)
  }

  return {
    addUserSkill,
  }
}
