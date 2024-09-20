import type {User} from "~/types/user";
import Cookies from "js-cookie";
import type {AxiosInstance} from "axios";
import {AxiosUtil} from "~/utils/api/axios.util";

export class AuthUtil {
    private refreshToken: string;
    private accessToken: string;
    private axiosInstance: AxiosInstance;

    constructor() {
        this.accessToken = this.getAccessToken()
        this.refreshToken = this.getRefreshToken()
        this.axiosInstance = AxiosUtil.axiosFactory()
    }

    public setAccessToken(accessToken: string): void {
        this.accessToken = accessToken;
        Cookies.set("accessToken", accessToken);
        console.log("accessTokenUpdated", this.accessToken);
    }

    public setRefreshToken(refreshToken: string): void {
        this.refreshToken = refreshToken;
        Cookies.set("refreshToken", refreshToken);
        console.log("refreshTokenUpdated", this.refreshToken);
    }

    public getAccessToken(): string {
        return Cookies.get("accessToken");
    }

    public getRefreshToken(): string {
        return Cookies.get("refreshToken");
    }

    public async login(username: string, password: string): Promise<void> {
        const {accessToken, refreshToken} = await this.axiosInstance.post('/auth/login', {username, password}).then(r => r.data);

        this.setAccessToken(accessToken);
        this.setRefreshToken(refreshToken);
    }

    public async refreshTokens(): Promise<any> {
        const {accessToken, refreshToken} = await this.axiosInstance.post('/auth/refresh', {}, {
            headers: {
                Authorization: `Bearer ${this.refreshToken}`
            }
        }).then(r => r.data)

        this.setAccessToken(accessToken);
        this.setRefreshToken(refreshToken);
    }

    public async getSession(): Promise<User | null> {
        return await this.axiosInstance.get('/users/me', {
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        }).then(r => r.data).catch((error) => {
            console.error("cannot get session", this.accessToken);
        })
    }
}