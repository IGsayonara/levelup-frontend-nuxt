import type {Project} from "~/types/project";
import type {AxiosInstance} from "axios";
import {AxiosUtil} from "~/utils/axios.util";
import {ApiUtil} from "~/utils/api.util";

export class ProjectUtil extends ApiUtil {
    public async loadProjects(): Promise<Project[]> {
        this.authorizeAxiosInstance()
        return await this.axiosInstance.get('/projects').then(r => r.data).then(data => data.data)
    }
}