import type { UserProjectSkill } from '~/types/user-project-skill'
import { useNuxtApp } from '#app'

export const useEditUserProjectSkill = defineStore('editUserProjectSkill', () => {
  const { $api } = useNuxtApp()
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  const userProjectSkill = reactive({
    id: 0,
    description: '',
  })

  const init = (userProjectId: number, projectSkillId: number) => {
    const userProjectSkills = user.value?.userProjects.find(userProject => userProject.id === userProjectId)?.skills as UserProjectSkill[]

    const newProjectSkill = userProjectSkills.find(projectSkill => projectSkill.id === projectSkillId)

    Object.assign(userProjectSkill, newProjectSkill)
  }

  const update = async () => {
    return await $api.userProjectSkill.userProjectSkillControllerUpdateUserProjectSkill(userProjectSkill.id, userProjectSkill)
  }

  const deleteUserProjectSkill = async () => {
    return await $api.userProjectSkill.userProjectSkillControllerDeleteUserProjectSkill(userProjectSkill.id)
  }

  return {
    init,
    update,
    delete: deleteUserProjectSkill,
    ...toRefs(userProjectSkill),
  }
})
