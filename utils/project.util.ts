import type {Project} from "~/types/project";
import {ApiUtil} from "~/utils/api.util";

export class ProjectUtil extends ApiUtil {
    public async loadProjects(title: string): Promise<Project[]> {
        this.authorizeAxiosInstance()
        return await this.axiosInstance.get('/projects', {
            params: {
                'filter.title': `$ilike:${title}`,
            },
        }).then(r => r.data)
    }
}