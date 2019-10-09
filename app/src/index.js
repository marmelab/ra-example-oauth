import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Admin, Resource, ListGuesser } from 'react-admin';

import dataProvider from './dataProvider';
import authProvider from './authProvider';
import LoginPage from './LoginPage'

ReactDOM.render(
    <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
    >
        <Resource name="resource" list={ListGuesser} />
    </Admin>,
    document.getElementById('root'));
