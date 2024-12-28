import { ApiUtil } from '~/utils/api/api.util'

export class UserProjectSkillUtil extends ApiUtil {
  public async updateUserProjectSkill(userProjectSkill: UpdateUserProjectSkill): Promise<void> {
    this.authorizeAxiosInstance()
    return await this.put(`users/userProjectSkill/${userProjectSkill.id}`, userProjectSkill)
  }

  public async addUserProjectSkill(userProjectSkill: CreateUserProjectSkill): Promise<void> {
    this.authorizeAxiosInstance()
    return await this.post(`/users/userProjectSkill/add`, userProjectSkill)
  }

  public async deleteUserProjectSkill(userProjectSkillId: number) {
    this.authorizeAxiosInstance()
    return await this.delete(`/users/userProjectSkill/delete/${userProjectSkillId}`)
  }
}
