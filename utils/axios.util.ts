import axios, {AxiosInstance, CreateAxiosDefaults} from "axios";
import Cookies from "js-cookie";
import {defaultAxiosConfig} from "~/config/defaultAxiosConfig";

export class AxiosUtil {
    public static axiosFactory(createAxiosDefaults?: CreateAxiosDefaults) {
        return axios.create({
            ...defaultAxiosConfig,
            createAxiosDefaults,
        })
    }
}