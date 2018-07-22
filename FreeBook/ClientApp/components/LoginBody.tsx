import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { LoginForm } from './Login/LoginForm';
import { alertActions } from '../_actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userActions } from '../_actions';

class LoginBody extends React.Component<any, any>
{
    constructor(props:any) {
        super(props);
        console.log("login here")

        // reset login status

        const dispatch = this.props.dispatch;
        dispatch(userActions.logout());
        dispatch(alertActions.clear());
    }
    public render() {
        const { alert } = this.props;
        const { authentication } = this.props;
        if (alert.type == 'alert-success' && authentication.loggedIn)
            return <Redirect to="/" />;
        return (
            <div style={{ textAlign: 'center' }}>
                {alert.message &&
                    <div className={`loginalert ${alert.type}`}>{alert.message}</div>
                }
                <LoginForm />
            </div>
            )
    }
}

function mapStateToProps(state: any, ownProps: any) {
    const { alert, authentication } = state;
    return Object.assign({}, ownProps, { alert, authentication });
}

const connectedbody = connect(mapStateToProps)(LoginBody);
export { connectedbody as LoginBody }; 