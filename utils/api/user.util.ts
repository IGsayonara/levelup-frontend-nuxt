import { ApiUtil } from '~/utils/api/api.util'

import type { UserResponseDto } from '~/utils/api/types/user'

export class UserUtil extends ApiUtil {
  public async fetchUser(username: string): Promise<UserResponseDto> {
    return await this.axiosInstance.get(`/users/${username}`).then(r => r.data)
  }
}
