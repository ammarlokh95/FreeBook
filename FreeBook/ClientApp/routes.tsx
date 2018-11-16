import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { DefaultLayout } from './components/Layout';
import { Home } from './components/Home';
import { LoginBody } from './components/LoginBody';
import { RegisterBody } from './components/RegisterBody';
import { ProfilePage } from './components/ProfilePage';
//import { PrivateRoute } from './components/PrivateRoute';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightBaseTheme } from 'material-ui/styles/baseThemes/lightBaseTheme';
import { Switch } from 'react-router';
import { NavMenu } from './components/NavMenu';
import { LoginNav } from './components/LoginNav';
import { Component } from 'react';


export const routes = <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)} >
    <DefaultLayout exact path='/' component={Home} NavMenuType={NavMenu} />
    <DefaultLayout path="/profile" component={ProfilePage} NavMenuType={NavMenu} />
</MuiThemeProvider>;
