import { UserUtil } from '~/utils/api/user.util'
import { UserProjectUtil } from '~/utils/api/user-project.util'
import { UserProjectSkillUtil } from '~/utils/api/user-project-skill.util'
import { ProjectUtil } from '~/utils/api/project.util'
import { UserSkillUtil } from '~/utils/api/user-skill.util'
import { SkillUtil } from '~/utils/api/skill.util'

export const userUtil = new UserUtil()

export const userProjectUtil = new UserProjectUtil()

export const userProjectSkillUtil = new UserProjectSkillUtil()

export const userSkillUtil = new UserSkillUtil()

export const projectUtil = new ProjectUtil()

export const skillUtil = new SkillUtil()
