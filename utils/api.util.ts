import type {AxiosInstance} from "axios";
import type {AuthUtil} from "~/utils/auth.util";
import axios from "axios";
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
}