import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import { StatusArea } from './Home/StatusArea';
import { ScrollableContent } from './Home/ScrollableContent';
import { connect } from 'react-redux';

class Home extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            firstname: ''
        }
    }

    render() {
        const auth = this.props.authentication;
        var user;

        var { loggedIn } = this.props.authentication;
        var { loggedOut } = this.props.authentication;
        try {
            user = (window as any).localStorage.getItem('user');
            if (user) {
                loggedIn = true;
                user = JSON.parse(user)
            }
            else {
                return <Redirect to="/login" />
            }
        }
        catch (err) {
            console.log("localstorage not found?");
        }

        return (
            <div className="HomePage" >
                <StatusArea username={user.username} />
                <ScrollableContent status={this.props.status} />
            </div>
        );
      
    }
}
function mapStateToProps(state: any, ownProps: any) {
    const { authentication,status } = state;
    return Object.assign({}, ownProps, { authentication,status });
}

const connectedbody = connect(mapStateToProps)(Home);
export { connectedbody as Home }; 