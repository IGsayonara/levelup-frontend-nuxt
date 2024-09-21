import type {Project} from "~/types/project";

export type User = {
    id: number;
    username: string;
    projects: Project[];
}