import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';
import { UserManager } from 'oidc-client';

const issuer = 'https://accounts.google.com/';
const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;

const userManager = new UserManager({
    authority: issuer,
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'token',
    scope: 'openid email profile', // Allow to retrieve the email and user name later api side
});

const authProvider = async (type, params = {}) => {
    if (type === AUTH_LOGIN) {
        // 1. Redirect to the issuer to ask authentication
        if (!params.token) {
            userManager.signinRedirect();
            return; // Do not return anything, the login is still loading
        }

        // 2. We came back from the issuer with #token infos in query params
        localStorage.setItem('token', JSON.stringify(params.token));
        userManager.clearStaleState();
        return Promise.resolve();
    }

    if ([AUTH_LOGOUT, AUTH_ERROR].includes(type)) {
        localStorage.removeItem('token');
        return Promise.resolve();
    }

    if (type === AUTH_CHECK) {
        return !!localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }

    return Promise.resolve();
}

export default authProvider;
