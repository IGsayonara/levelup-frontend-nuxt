import {ApiUtil} from "~/utils/api/api.util";
import type {WithPagination} from "~/utils/api/types/api";
import type {ProjectResponseDto} from "~/utils/api/types/project";

export class ProjectUtil extends ApiUtil {
    public async loadProjects(title: string): Promise<WithPagination<ProjectResponseDto>> {
        this.authorizeAxiosInstance()
        return await this.axiosInstance.get('/projects', {
            params: {
                'filter.title': `$ilike:${title}`,
            },
        }).then(r => r.data)
    }
}