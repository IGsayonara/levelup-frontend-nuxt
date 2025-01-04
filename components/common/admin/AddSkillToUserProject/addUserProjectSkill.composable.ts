import { useNuxtApp } from '#app'

export const useAddUserProjectSkill = () => {
  const { $api } = useNuxtApp()
  const userStore = useUserStore()
  const { fetchUser, user } = userStore

  const addSkillToUserProject = async (userProjectId: number, skillId: number) => {
    await $api.userProjectSkill.userProjectSkillControllerAddUserProjectSkill({
      userProjectId,
      skillId,
    })

    await fetchUser(user?.username as string)
  }

  return {
    addSkillToUserProject,
  }
}
