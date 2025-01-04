import type { Project } from '~/types/project'
import type { UserProjectSkill } from '~/types/user-project-skill'

export type UserProject = {
  id: number
  // user: User
  project: Project
  role: string
  description: string
  skills: UserProjectSkill[]
}
