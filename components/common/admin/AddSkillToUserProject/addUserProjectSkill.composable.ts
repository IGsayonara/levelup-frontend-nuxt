import { useNuxtApp } from '#app'

export const useAddUserProjectSkill = () => {
  const { $api } = useNuxtApp()
  const userStore = useUserStore()
  const { fetchUser, user } = userStore

  const addSkillToUserProject = async (userProjectId: number, skillId: number) => {
    await $api.userProjectSkill.userProjectSkillControllerAddOne({
      userProjectId,
      skillId,
    })

    if (user) {
      await fetchUser(user.username)
    }
  }

  return {
    addSkillToUserProject,
  }
}
