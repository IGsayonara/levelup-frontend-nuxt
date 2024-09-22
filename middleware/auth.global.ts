import Cookies from 'js-cookie';
import {AuthUtil} from "~/utils/api/auth.util";

const authUtil = new AuthUtil();

export default defineNuxtRouteMiddleware(async (to, from) => {

    if (import.meta.env.SSR) {
        return
    }

    const authStore = useAuthStore();
    const {getSession, refreshTokens} = authStore;

    try {
        console.log(from.name, to.name)

        if(!authUtil.getAccessToken()){
            console.log("No access token")
            if (to.name !== 'login') {
                return '/login';
            }
            return
        }


        await refreshTokens()
        await getSession()

    } catch (error) {
        console.error('Authentication check failed', error);
        if (to.name !== 'login') {
            return '/login';
        }
    }
});
