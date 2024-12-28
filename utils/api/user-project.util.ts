import { ApiUtil } from '~/utils/api/api.util'

export class UserProjectUtil extends ApiUtil {
  public async updateUserProject(userProject: UpdateUserProjectDto): Promise<void> {
    this.authorizeAxiosInstance()
    return await this.axiosInstance.put(`/users/userProject/edit/${userProject.id}`, {
      description: userProject.description,
      role: userProject.role,
    })
  }

  public async deleteUserProject(userProjectId: number): Promise<void> {
    this.authorizeAxiosInstance()
    return await this.delete(`/users/userProject/delete/${userProjectId}`)
  }
}
