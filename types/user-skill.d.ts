import type { Skill } from '~/types/skill'
import type { User } from '~/types/user'

export type UserSkill = {
  id: number
  user?: User
  skill?: Skill
  learnedAt: Date
  description: string
}
