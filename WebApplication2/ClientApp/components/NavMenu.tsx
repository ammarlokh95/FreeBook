import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
export class NavMenu extends React.Component<any, {}> {
    public render() {
        var user;
        try {
            user = (window as any).localStorage.getItem('user');
            if (user) {
                user = JSON.parse(user)
            return <div className='main-nav'>
                        <div className='navbar navbar-inverse'>
                        <div className='navbar-header'>
                            <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                                <span className='sr-only'>Toggle navigation</span>
                                <span className='icon-bar'></span>
                                <span className='icon-bar'></span>
                                <span className='icon-bar'></span>
                            </button>
                            <Link className='navbar-brand' to={ '/' }>iPipeBook</Link>
                        </div>
                        <div className='clearfix'></div>
                        <div className='navbar-collapse collapse'>
                            <ul className='nav navbar-nav'>
                                <li>
                                    <NavLink exact to={ '/' } activeClassName='active'>
                                        <span className='glyphicon glyphicon-home'></span> Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/profile?username=' + user.username} activeClassName='active'>
                                        <span className='glyphicon glyphicon-th-list'></span> Profile Page
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/login'} activeClassName='active'>
                                        <span className='glyphicon glyphicon-th-list'></span> Logout
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>;
            }
        }
        catch (err) {
            return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                    <div className='navbar-header'>
                        <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                            <span className='sr-only'>Toggle navigation</span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                        </button>
                        <Link className='navbar-brand' to={'/'}>iPipeBook</Link>
                    </div>
                    <div className='clearfix'></div>
                    <div className='navbar-collapse collapse'>
                        <ul className='nav navbar-nav'>
                            <li>
                                <NavLink exact to={'/'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-home'></span> Home
                                    </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/login'} activeClassName='active'>
                                    <span className='glyphicon glyphicon-th-list'></span> Logout
                                    </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>;
        }
    }
}


