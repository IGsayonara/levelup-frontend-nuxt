import type { UserProjectSkill } from '~/types/user-project-skill'

export const useEditUserProjectStore = defineStore('editUserProject', () => {
  const { $api } = useNuxtApp()
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  const userProject = reactive({
    id: 0,
    description: '',
    skills: [] as UserProjectSkill[],
    role: '',
  })

  const update = async () => {
    await $api.userProject.userProjectControllerUpdateOne(userProject.id, {
      role: userProject.role,
      description: userProject.description,
      shortDescription: userProject.description,
    })
  }

  const deleteUserProject = async () => {
    await $api.userProject.userProjectControllerDeleteOne(userProject.id)
  }

  const init = (userProjectId: number) => {
    const newUserProject = user.value?.userProjects.find(userProject => userProject.id === userProjectId)
    Object.assign(userProject, newUserProject)
  }

  return {
    init,
    update,
    delete: deleteUserProject,
    ...toRefs(userProject),
  }
})
