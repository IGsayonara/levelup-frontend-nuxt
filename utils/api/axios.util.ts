import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import { defaultAxiosConfig } from '~/config/defaultAxiosConfig'

export class AxiosUtil {
  public static axiosFactory(createAxiosDefaults?: CreateAxiosDefaults) {
    return axios.create({
      ...defaultAxiosConfig,
      createAxiosDefaults,
    })
  }
}
