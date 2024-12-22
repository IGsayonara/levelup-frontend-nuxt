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
    return await this.axiosInstance.put(`/users/me/profileImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set appropriate content type
      },
    })
  }

  public async updateUserProjectSkill(userProjectSkill: UpdateUserProjectSkill): Promise<void> {
    this.authorizeAxiosInstance()
    return await this.axiosInstance.put(`users/userProjectSkill/${userProjectSkill.id}`, userProjectSkill)
  }

  public async addUserProjectSkill(userProjectSkill: CreateUserProjectSkill): Promise<void> {
    this.authorizeAxiosInstance()
    return await this.axiosInstance.post(`/users/userProjectSkill/add`, userProjectSkill)
  }

  public async addUserSkill(skillId: string): Promise<void> {
    this.authorizeAxiosInstance()
    return await this.axiosInstance.post(`/users/userSkill/add/${skillId}`)
  }

  public async deleteUserProjectSkill(userProjectSkillId: number) {
    this.authorizeAxiosInstance()
    return await this.axiosInstance.delete(`/users/userProjectSkill/delete/${userProjectSkillId}`)
  }

  public async deleteUserSkill(userSkillId: number) {
    this.authorizeAxiosInstance()
    return await this.axiosInstance.delete(`/users/userSkill/delete/${userSkillId}`)
  }

  public async updateUserSkill(userSkill: updateUserSkill) {
    this.authorizeAxiosInstance()
    return await this.axiosInstance.put(`/users/userSkill/edit/${userSkill.id}`, {
      description: userSkill.description,
    })
  }
}
