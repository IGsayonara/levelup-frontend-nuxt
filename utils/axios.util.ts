import axios, {CreateAxiosDefaults} from "axios";

export const axiosFactory = (createAxiosDefaults: CreateAxiosDefaults) => {
    return axios.create(createAxiosDefaults)
}