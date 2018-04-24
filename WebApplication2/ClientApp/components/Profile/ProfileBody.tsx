import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { connect } from 'react-redux';
import  Paper  from 'material-ui/Paper';

class ProfileBody extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            firstname: ''
        }
    }

    render() {


        return (
            <div className="ProfilePage"   >
                
            </div>
        );
    }
}
function mapStateToProps(state: any, ownProps: any) {
    const { authentication, status } = state;
    return Object.assign({}, ownProps, { authentication, status });
}

const connectedbody = connect(mapStateToProps)(ProfileBody);
export { connectedbody as ProfileBody }; 