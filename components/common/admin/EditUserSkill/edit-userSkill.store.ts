import type { UserProject } from '~/types/user-project'
import { useNuxtApp } from '#app'

export const useEditUserSkillStore = defineStore('editUserSkill', () => {
  const { $api } = useNuxtApp()
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const { fetchUser } = userStore
  const userProjects = ref<UserProject[]>([])
  const userSkill = reactive({
    id: 0,
    description: '',
  })

  const update = async () => {
    await $api.userSkill.userSkillControllerUpdateOne(userSkill.id, { description: userSkill.description })
  }

  const deleteUserSkill = async () => {
    await $api.userSkill.userSkillControllerDeleteOne(userSkill.id)

    if (!user.value) {
      throw new Error('User does not exist')
    }

    await fetchUser(user.value.username)
  }

  const init = (userSkillId: number) => {
    const newUserSkill = user.value?.userSkills.find(userSkill => userSkill.id === userSkillId)
    Object.assign(userSkill, newUserSkill)

    const skillId = user.value?.userSkills.find(userSkill => userSkill.id === userSkillId)?.skill.id
    userProjects.value = user.value?.userProjects
      .filter((userProject) => {
        return userProject.skills.findIndex((userProjectSkill) => {
          return userProjectSkill.skill.id === skillId
        }) >= 0
      }) || []
  }

  return {
    ...toRefs(userSkill),
    userProjects,
    deleteUserSkill,
    update,
    init,
  }
})
