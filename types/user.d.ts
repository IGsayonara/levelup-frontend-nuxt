import type { UserProject } from '~/types/user-project'
import type { UserSkill } from '~/types/user-skill'

export type User = {
  id: number
  username: string
  userProjects: UserProject[]
  userSkills: UserSkill[]
  firstName: string
  lastName: string
  email: string
  profileImage: string
  bio: string
  phoneNumber: string
  address: string
  dateOfBirth?: string
}
