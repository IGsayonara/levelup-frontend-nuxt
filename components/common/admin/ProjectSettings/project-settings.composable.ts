import type { User } from '~/types/user'
import { UserUtil } from '~/utils/api/user.util'

const userUtil = new UserUtil()

export const useProjectSettings = (user: User) => {
  addProject(user.id)
}
