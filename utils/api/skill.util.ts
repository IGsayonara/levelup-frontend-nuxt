import {ApiUtil} from "~/utils/api/api.util";
import type {Paginated} from "~/utils/api/types/api";

export class SkillUtil extends ApiUtil{
    public async loadSkills(): Promise<SkillResponseDto[]> {
        return await this.axiosInstance.get('/skills').then(r => r.data)
    }
}