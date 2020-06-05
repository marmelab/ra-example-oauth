import { UserManager } from 'oidc-client';
import axios from 'axios';

import getProfileFromToken from './getProfileFromToken'

const issuer = 'https://accounts.google.com/';
const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const apiUri = process.env.REACT_APP_API_URL;

const userManager = new UserManager({
    authority: issuer,
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile'
});

const authProvider = {
  login: async (params = {}) => {
    // We need to check that a params object is actually passed otherwise it will fail.
    if (!params || !params.code || !params.state) {
      userManager.signinRedirect();
      // Here we reject the request because there is no notification shown, but we can add an object if we want to add logic in the login call.
      return Promise.reject({ message: 'Retrieving code from authentication service.', code: 'oauthRedirect'});
    }
    
    // Remove stale states, this is 
    userManager.clearStaleState();
    // The UserManager stores state to localStorage this is the key so we need to retreive it on redirect. 
    const stateKey = `oidc.${params.state}`;
    const { code_verifier } = JSON.parse(
        localStorage.getItem(stateKey) || '{}'
    );


    // Send the request for the token using the code to our authenticator.
    const { data } = await axios({
      method: 'POST',
      url: `${apiUri}/auth`,
      data: {
        code: params.code,
        code_verifier: code_verifier
      },
      responseType: 'json',
      headers: {
        'Authorization': `Bearer ${params.code}`
      }
    })

    localStorage.setItem('token', JSON.stringify(data));
    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem('token')

    return Promise.resolve();
  },
  checkError: (error) => {
    const { status } = error;

    if (status && (status === 401 || status === 403)) {
        localStorage.clear();

        return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: params => {
    const token = localStorage.getItem('token')

    if (!token) {
      return Promise.reject()
    }

    // This is specific to the Google authentication implementation
    const jwt = getProfileFromToken(token);
    const now = new Date();

    return now.getTime() > (jwt.exp * 1000) ? Promise.reject() : Promise.resolve()
  },
  getPermissions: params => {
    const token = localStorage.getItem('token');

    return token ? Promise.resolve(token) : Promise.reject()
    }
  }

export default authProvider;