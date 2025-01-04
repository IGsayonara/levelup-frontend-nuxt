import type { Skill } from '~/types/skill'

export type UserSkill = {
  id: number
  // user: User
  skill: Skill
  learnedAt: string
  description: string
}
