import type {User} from "~/types/user";
import {defineStore} from "pinia";
import {AuthUtil} from "~/utils/api/auth.util";


export const useAuthStore = defineStore('AuthStore', () => {
    const user = ref<User | null>()
    const isAuthenticated = computed(() => !!user.value)

    const authUtil = new AuthUtil()

    const getSession = async (): User => {
        try{
            user.value = await authUtil.fetchSession()
        }
        catch(error){
            user.value = null
        }
    }

    const refreshTokens = async () => {
        await authUtil.refreshTokens()
    }

    const login = async (username: string, password: string) => {
        await authUtil.login(username, password);
        await getSession();
    }

    const logout = () => {
        throw ('Method not implemented');
    }

    return {
        isAuthenticated, user, getSession, refreshTokens, login, logout
    }
})