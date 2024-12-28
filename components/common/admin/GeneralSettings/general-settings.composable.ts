import type { User } from '~/types/user'
import { UserUtil } from '~/utils/api/user.util'

import { userUtil } from '~/utils/api'

export const useGeneralSettings = () => {
  const userStore = useUserStore()
  const { user } = storeToRefs<{ user: User }>(userStore)
  const editableUser = reactive({
    bio: user.value.bio,
    email: user.value.email,
    address: user.value.address,
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    phoneNumber: user.value.phoneNumber,
    dateOfBirth: user.value.dateOfBirth,
  })

  const profileImage = ref(user.value.profileImage)

  const updateProfileImage = async (file) => {
    await userUtil.updateProfileImage(file)
  }

  const update = async () => {
    await userUtil.updateUser(editableUser)
  }

  return {
    update,
    user: editableUser,
    profileImage,
    updateProfileImage,
  }
}
