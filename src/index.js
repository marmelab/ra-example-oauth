import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Admin, Resource, ListGuesser } from 'react-admin';

import dataProvider from './dataProvider';
import authProvider from './authProvider';
import LoginPage from './LoginPage'

const history = createBrowserHistory({ basename: process.env.REACT_APP_BASENAME });

ReactDOM.render(
    <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
        history={history}
    >
        <Resource name="resource" list={ListGuesser} />
    </Admin>,
    document.getElementById('root'));
