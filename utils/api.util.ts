import type {AxiosInstance, AxiosResponse} from "axios";
import type {AuthUtil} from "~/utils/auth.util";
import {AxiosUtil} from "~/utils/axios.util";

export class ApiUtil {
    private axiosInstance: AxiosInstance;
    private authUtil: AuthUtil;

    constructor() {
        this.authUtil = new AuthUtil();
        this.axiosInstance = AxiosUtil.axiosFactory()
    }

    private authorizeAxiosInstance() {
        this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${this.authUtil.getAccessToken()}`;
    }

    public async get(url: string) {
        return await this.axiosInstance.get(url).then(r => r.data)
    }
}