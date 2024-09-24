import type { Skill } from '~/types/skill'

export type ProjectResponseDto = {
  id: string
  title: string
  description?: string
  skills: Skill[]
  created_at: string
  updated_at: string
}
