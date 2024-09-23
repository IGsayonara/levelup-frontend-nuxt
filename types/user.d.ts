import type {Project} from "~/types/project";
import type {Skill} from "~/types/skill";

export type User = {
    id: number;
    username: string;
    password: string;
    projects?: UserProject[];
    skills?: UserSkill[];
    refreshToken: string;
}

export type UserSkill = {
    id: number;
    user?: User;
    skill?: Skill;
    learnedAt: Date;
    description: string;
}

export type UserProject = {
    id: number;
    user?: User;
    project?: Project;
    role: string;
    description: string;
}
