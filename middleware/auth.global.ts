import Cookies from 'js-cookie';
import {AuthUtil} from "~/utils/api/auth.util";

export default defineNuxtRouteMiddleware(async (to, from) => {

    if (import.meta.env.SSR) {
        return
    }
    const authStore = useAuthStore();
    const {user} = storeToRefs(authStore);
    const {getSession, refreshTokens} = authStore;

    try {
        await refreshTokens()
        await getSession()

        if (!user.value) {
            if (to.name !== 'login') {
                return '/login';
            }
            return;
        }

        if (to.name === 'login') {
            return '/';
        }

    } catch (error) {
        console.error('Authentication check failed', error);
        if (to.name !== 'login') {
            return '/login';
        }
    }
});
