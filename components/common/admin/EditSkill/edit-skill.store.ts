import type { UserProject } from '~/types/user'

export const useEditUserSkillStore = defineStore('editUserSkill', () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const id = ref(null)
  const description = ref('')
  const userProjects = ref<UserProject[]>([])

  const update = async () => {

  }

  const init = (userSkillId: number) => {
    const skillId = user.value.userSkills.find(userSkill => userSkill.id === userSkillId).skill.id
    userProjects.value = user.value.userProjects
      .filter((userProject) => {
        return userProject.skills.findIndex(userProjectSkill => userProjectSkill.skill.id === skillId) >= 0
      })
  }

  return {
    id,
    description,
    userProjects,
    update,
    init,
  }
})
