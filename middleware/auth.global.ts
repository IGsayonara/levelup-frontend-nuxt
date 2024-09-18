import Cookies from 'js-cookie';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authUtil = new AuthUtil();

    try {
        const accessToken = Cookies.get('accessToken');
        if (!accessToken) {
            if (to.name !== 'login') {
                return '/login';
            }
            return;
        }

        // Verify the token by making a request
        await authUtil.refreshTokens()
        const user = await authUtil.getSession();
        if (!user) {
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
