import type { User, UserProjectSkill } from '~/types/user'
import type { Project } from '~/types/project'

export type UserProject = {
  id: number
  user?: User
  project?: Project
  role: string
  description: string
  skills: UserProjectSkill[]
}
