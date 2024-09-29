import type { Project } from '~/types/project'
import type { Skill } from '~/types/skill'

export type User = {
  id: number
  username: string
  userProjects?: UserProject[]
  userSkills?: UserSkill[]
  firstName?: string
  lastName?: string
  email?: string
  profileImage?: string
  bio?: string
  phoneNumber?: string
  address?: string
  dateOfBirth?: Date
}

export type UserSkill = {
  id: number
  user?: User
  skill?: Skill
  learnedAt: Date
  description: string
}

export type UserProject = {
  id: number
  user?: User
  project?: Project
  role: string
  description: string
  skills: UserProjectSkill[]
}

export type UserProjectSkill = {
  id: number
  userProject?: UserProjectResponseDto
  skill?: SkillResponseDto
  description: string
}
