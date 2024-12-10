import type { AxiosInstance } from 'axios'
import { AuthUtil } from '~/utils/api/auth.util'
import { AxiosUtil } from '~/utils/api/axios.util'

export class ApiUtil {
  private axiosInstance: AxiosInstance
  private authUtil: AuthUtil

  constructor() {
    this.authUtil = new AuthUtil()
    this.axiosInstance = AxiosUtil.axiosFactory()
  }

  protected authorizeAxiosInstance() {
    this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${this.authUtil.getAccessToken()}`
  }

  public async get(url: string) {
    return await this.axiosInstance.get(url).then(r => r.data)
  }
}
