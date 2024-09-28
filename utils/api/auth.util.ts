import Cookies from 'js-cookie'
import type { AxiosInstance } from 'axios'
import type { User } from '~/types/user'
import { AxiosUtil } from '~/utils/api/axios.util'
import type { UserResponseDto } from '~/utils/api/types/user'

export class AuthUtil {
  private refreshToken: string
  private accessToken: string
  private axiosInstance: AxiosInstance

  constructor() {
    this.accessToken = this.getAccessToken()
    this.refreshToken = this.getRefreshToken()
    this.axiosInstance = AxiosUtil.axiosFactory()
  }

  public setAccessToken(accessToken: string): void {
    this.accessToken = accessToken
    Cookies.set('accessToken', accessToken)
  }

  public setRefreshToken(refreshToken: string): void {
    this.refreshToken = refreshToken
    Cookies.set('refreshToken', refreshToken)
  }

  public getAccessToken(): string {
    return Cookies.get('accessToken')
  }

  public getRefreshToken(): string {
    return Cookies.get('refreshToken')
  }

  public async login(username: string, password: string): Promise<void> {
    const { accessToken, refreshToken } = await this.axiosInstance.post('/auth/login', { username, password }).then(r => r.data)

    this.setAccessToken(accessToken)
    this.setRefreshToken(refreshToken)
  }

  public async refreshTokens(): Promise<void> {
    const { accessToken, refreshToken } = await this.axiosInstance.post('/auth/refresh', {}, {
      headers: {
        Authorization: `Bearer ${this.refreshToken}`,
      },
    }).then(r => r.data)

    this.setAccessToken(accessToken)
    this.setRefreshToken(refreshToken)
  }

  public async fetchSession(): Promise<UserResponseDto> {
    return await this.axiosInstance.get('/users/me', {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    }).then(r => r.data).catch((_error) => {
      console.error('cannot get session', this.accessToken)
    })
  }

  public async logout(): Promise<void> {
    this.setAccessToken(undefined)
    this.setRefreshToken(undefined)
  }
}
