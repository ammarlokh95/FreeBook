import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { RegisterForm } from './Register/RegisterForm';
import { alertActions } from '../_actions';
import { connect } from 'react-redux';

class RegisterBody extends React.Component<any, any>
{
    constructor(props: any) {
        super(props);

        var dispatch  = this.props.dispatch;

        dispatch(alertActions.clear());
    }
    public render(): any {
        const { alert } = this.props;
        if (alert.type == 'alert-success')
            return <Redirect to="/login" />;
        return (
            <div style={{ textAlign: 'center' }}>
                {alert.message &&
                    <div className={`registeralert ${alert.type}`}>{alert.message}</div>
                }
                <RegisterForm />
            </div>
            )
    }
}

function mapStateToProps(state: any, ownProps: any) {
    const { alert } = state;
    return Object.assign({}, ownProps, { alert });
}
//function mergeProps(state: any, ownProps: any) {
//    const { alert } = state;
//    return Object.assign({}, ownProps, { alert});
//}
const connectedbody = connect(mapStateToProps)(RegisterBody);
export { connectedbody as RegisterBody }; 