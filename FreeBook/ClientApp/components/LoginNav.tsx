import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
export class LoginNav extends React.Component<any, {}> {
    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header' style={{
                    textAlign: 'center',
                    width: '100%',
                }}>
                    <Link className='navbar-brand'  to={ '/' }>Welcome to FreeBook</Link>
                </div>
            </div>
        </div>;
    }
}


