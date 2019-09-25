import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

const authProvider = async (type, params) => {
    if (type === AUTH_LOGIN) {
        if (params.token) {
            localStorage.setItem('token', JSON.stringify(params.token));
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
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
