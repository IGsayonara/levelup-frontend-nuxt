import type { ProjectResponseDto } from '~/utils/api/types/project'

export type UserResponseDto = {
  id: number
  username: string
  projects?: ProjectResponseDto[]
  skills?: ISkill[]
}

export type UpdateUserGeneralInfoDto = {
  username: string
  address: string
  bio: string
}
