import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { createBrowserHistory } from 'history';

import dataProvider from './dataProvider';
import authProvider from './authProvider';
import LoginPage from './LoginPage'
import Dashboard from './Dashboard';

// We need to have our own history as Google OAuth does not allow fragments i.e. 'https://basurl/#/login'
const history = createBrowserHistory();

export default () => <Admin
    dataProvider={dataProvider('http://localhost:8080')}
    authProvider={authProvider}
    history={history}
    loginPage={LoginPage}
    dashboard={Dashboard}
    >
  
    <Resource name="resource" list={ListGuesser}/>
</Admin>;