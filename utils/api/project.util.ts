import { ApiUtil } from '~/utils/api/api.util'
import type { Paginated } from '~/utils/api/types/api'
import type { ProjectResponseDto } from '~/utils/api/types/project'

export class ProjectUtil extends ApiUtil {
  public async loadProjects(title: string): Promise<Paginated<ProjectResponseDto>> {
    return await this.axiosInstance.get('/projects', {
      params: {
        'filter.title': `$ilike:${title}`,
      },
    }).then(r => r.data)
  }

  public async loadProject(id: number): Promise<ProjectResponseDto> {
    return await this.axiosInstance.get(`/projects/${id}`).then(r => r.data)
  }

  public async addProject(project: CreateProjectDto): Promise<void> {
    this.authorizeAxiosInstance()
    return await this.axiosInstance.post(`/projects/my/add`, project)
  }

  public async updateProject(project: UpdateProjectDto): Promise<void> {
    this.authorizeAxiosInstance()
    return await this.axiosInstance.put(`/projects/edit/${project.id}`, project)
  }

  public async updateUserProject(userProject: UpdateUserProjectDto): Promise<void> {
    this.authorizeAxiosInstance()
    return await this.axiosInstance.put(`/users/userProject/edit/${userProject.id}`, {
      description: userProject.description,
      role: userProject.role,
    })
  }
}
