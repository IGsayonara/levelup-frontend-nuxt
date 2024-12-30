import { ApiUtil } from '~/utils/api/api.util'

export class UserSkillUtil extends ApiUtil {
  public async deleteUserSkill(userSkillId: number) {
    this.authorizeAxiosInstance()
    return await this.delete(`/users/userSkill/delete/${userSkillId}`)
  }

  public async addUserSkill(skillId: number): Promise<unknown> {
    this.authorizeAxiosInstance()
    return await this.post(`/users/userSkill/add/${skillId}`)
  }

  public async updateUserSkill(userSkill: any) {
    this.authorizeAxiosInstance()
    return await this.put(`/users/userSkill/edit/${userSkill.id}`, {
      description: userSkill.description,
    })
  }
}
