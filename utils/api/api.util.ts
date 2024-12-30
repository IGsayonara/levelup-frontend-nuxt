import type { AxiosInstance } from 'axios'
import { AuthUtil } from '~/utils/api/auth.util'
import { axiosFactory } from '~/utils/api/axios.util'

export class ApiUtil {
  private axiosInstance: AxiosInstance
  private authUtil: AuthUtil

  constructor() {
    this.authUtil = new AuthUtil()
    this.axiosInstance = axiosFactory()
  }

  protected authorizeAxiosInstance() {
    this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${this.authUtil.getAccessToken()}`
  }

  public async get(url: string) {
    return await this.axiosInstance.get(url).then(r => r.data)
  }

  public async post(url: string, data: unknown): Promise<unknown> {
    return await this.axiosInstance.post(url, data).then(r => r.data)
  }

  public async put(url: string, data: unknown): Promise<unknown> {
    return await this.axiosInstance.put(url, data).then(r => r.data)
  }

  public async delete(url: string): Promise<unknown> {
    return await this.axiosInstance.delete(url).then(r => r.data)
  }
}
