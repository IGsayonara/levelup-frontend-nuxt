import { useNuxtApp } from '#app'

export const useAddUserSkill = () => {
  const { $api } = useNuxtApp()

  const addUserSkill = async (skillId: number) => {
    await $api.userSkill.userSkillControllerAddOne(skillId)
  }

  return {
    addUserSkill,
  }
}
