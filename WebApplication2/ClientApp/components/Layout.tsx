import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Route } from 'react-router';

interface IDefaultProps {
    component: any,
    NavMenuType: any,
    path?: string;
    exact?: boolean;
}

export const DefaultLayout: React.SFC<IDefaultProps> = (props) => {
    const { component: Component, NavMenuType, ...rest } = props;
    try {
            (window as any).localStorage.setItem("lastFetch", 0);
    }
    catch (err) {
        console.log("localStorage not found");
    }
    return <Route {...rest} render={matchProps => (
        <div className='container-fluid'>
            <div className='row' >
                <div style={{
                    width: '80%',
                    marginLeft: '10%'
                }}>
                    <NavMenuType />
                </div>
                <div style={{
                    width: '70%',
                    marginLeft: '15%',
                    paddingTop: '4%'
                }}>
                    <Component {...matchProps} />
                </div>
            </div>
        </div>
    )}
    />
}
