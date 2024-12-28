import { ApiUtil } from '~/utils/api/api.util'

import type { UpdateUserGeneralInfoDto, UserResponseDto } from '~/utils/api/types/user'

export class UserUtil extends ApiUtil {
  public async fetchUser(username: string): Promise<UserResponseDto> {
    return await this.axiosInstance.get(`/users/${username}`).then(r => r.data)
  }

  public async updateUser(user: UpdateUserGeneralInfoDto): Promise<void> {
    this.authorizeAxiosInstance()
    return await this.axiosInstance.put(`/users/me/general`, user)
  }

  public async updateProfileImage(file): Promise<void> {
    this.authorizeAxiosInstance()
    const formData = new FormData()
    formData.append('file', file)
    return await this.put(`/users/me/profileImage`, formData)
  }
}
