import * as React from 'react';
import { RouteComponentProps } from 'react-router';

//import '../css/Login.css';
import { LoginBody } from './LoginBody';

export class Login extends React.Component<RouteComponentProps<{}>,any> {
  render() {
    return (
      <div className="Login">
        <header className="Login-header">
          <h1 className="Login-title">Login </h1>
        </header>
            <div className="Body">
                <LoginBody /> 
        </div>
      </div>
    );
  }
}
