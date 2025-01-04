import { useNuxtApp } from '#app'

export const useAddUserSkill = () => {
  const { $api } = useNuxtApp()

  const addUserSkill = async (skillId: number) => {
    await $api.userSkill.userSkillControllerAddUserSkill(skillId)
  }

  return {
    addUserSkill,
  }
}
