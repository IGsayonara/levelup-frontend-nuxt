import type { Skill } from '~/types/skill'

export type Project = {
  id: number
  title: string
  description?: string
  imageUrl?: string
  projectSkills: ProjectSkill[]
}

export type ProjectSkill = {
  id: number
  project?: Project
  skill?: Skill
  description: string
}
