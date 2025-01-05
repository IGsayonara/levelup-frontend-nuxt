import { useNuxtApp } from '#app'

export const useGeneralSettings = () => {
  const { $api } = useNuxtApp()
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const editableUser = reactive({
    bio: user.value?.bio || '',
    email: user.value?.email || '',
    address: user.value?.address || '',
    firstName: user.value?.firstName || '',
    lastName: user.value?.lastName || '',
    phoneNumber: user.value?.phoneNumber || '',
    dateOfBirth: user.value?.dateOfBirth || '',
  })

  const profileImage = ref(user.value?.profileImage)

  const updateProfileImage = async (file: File) => {
    await $api.userProfile.userProfileControllerUploadFile({ file })
  }

  const update = async () => {
    await $api.userProfile.userProfileControllerUpdateOne({
      ...editableUser,
    })
  }

  return {
    update,
    user: editableUser,
    profileImage,
    updateProfileImage,
  }
}
