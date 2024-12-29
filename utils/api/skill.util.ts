import { ApiUtil } from '~/utils/api/api.util'

export class SkillUtil extends ApiUtil {
  public async loadSkills(): Promise<SkillResponseDto[]> {
    return await this.get('/skills').then(r => r.data)
  }
}
