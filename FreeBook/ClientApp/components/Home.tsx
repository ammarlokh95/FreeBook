import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import { StatusArea } from './Home/StatusArea';
import { ScrollableContent } from './Home/ScrollableContent';
import { connect } from 'react-redux';

class Home extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const auth = this.props.authentication;
        var user = auth.user;
        console.log("now here")

        try {
            user = (window as any).localStorage.getItem('user');
            if (user != undefined) {

                console.log("now here")
                user = JSON.parse(user)
                return (
                    <div className="HomePage" >
                        <StatusArea username={user.username} />
                        <ScrollableContent status={this.props.status} />
                    </div>
                );
            }
            else {
                console.log("bkjb")
                return <Redirect to="/login" />
            }
        }
        catch (err) {
            console.log(user);

        }
        <div className="HomePage" >
            <StatusArea username={user.username} />
            <ScrollableContent status={this.props.status} />
        </div>
    }
}
function mapStateToProps(state: any, ownProps: any) {
    const { authentication,status } = state;
    return Object.assign({}, ownProps, { authentication,status });
}

const connectedbody = connect(mapStateToProps)(Home);
export { connectedbody as Home }; 