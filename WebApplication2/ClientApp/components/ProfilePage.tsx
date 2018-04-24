import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import  Paper  from 'material-ui/Paper';
import { ProfileBody } from './Profile/ProfileBody';
import { Avatar, Card, CardTitle } from 'material-ui';
import { CardHeader } from 'material-ui/Card';
import { CardText } from 'material-ui/Card/CardText';
import { userActions } from '../_actions';
import { StatusMessage } from './Home/StatusMessage';
import { Redirect } from 'react-router';
import { parse } from 'query-string';
class ProfilePage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        var user;
        this.state = {
            user: {},
            loggedUser: {}, 
            result: [],
            loggedIn:false
        }

        this.formatDate = this.formatDate.bind(this);
        try {
            console.log(this.props.location);
     
            var user = (window as any).localStorage.getItem('user');
            if (user) {
                this.setState({ loggedIn: true, loggedUser: user });
                var username = parse(this.props.location.search).username;
                this.props.dispatch(userActions.getUserInfo(username));
            }
        }
        catch (err) {
            console.log("localstorage not found?");
            this.setState({ loggedIn: false })
        }
        
    }
    componentWillReceiveProps(nextProps: any) {
        try {
            const { items } = nextProps.users;
            const { user, statuses } = items;


            var i = 0;
            var tempRes = statuses.map((res: any) => {
                var mydate = this.formatDate(res.postDate);
                return <StatusMessage username={res.username} message={res.message} postDate={mydate} />
            });
            this.setState({
                user: user,
                result: tempRes
            });
        }
        catch(err) {
            console.log("Props not received yet");
        }

    }
    formatDate(dateTime: any): string {
        var date = new Date(Date.parse(dateTime));
        var myDate = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + " at " + date.getHours() + ":" + date.getMinutes()
        return myDate;
    }
    render() {
        return (
            <Paper zDepth={4} style={{ height: 'auto', width: '-webkit-fill-available', backgroundColor: '#75aaff', alignSelf: 'center', marginTop:'2%' }} >
                    <Paper zDepth={2} style={{ margin: '1%', padding: '2%', overflow: 'auto' }}>
                        <div className="ImageContainer" style={{
                            position: 'relative',
                            width: '25%',
                            paddingBottom: '25%',
                            float: 'left',
                            height: '0'
                        }} >
                            <Avatar src="" style={{ width: '100%', height: '100%', position: 'absolute', left: '0' }} />
                        </div>
                        <Card style={{
                            float: 'right',
                            width: '65%',
                            marginTop: '5%',
                            marginBottom: '5%',
                            backgroundColor: '#00caf5'
                        }} >
                        <CardTitle title={this.state.user.firstname + " " + this.state.user.lastname} subtitle={"Join Date: " + this.formatDate(this.state.user.joinDate) } />
                        </Card>
                    </Paper>
                    <Paper zDepth={2} style={{ margin: '1%', padding: '2%', overflow: 'auto' }}>
                        <div style={{
                            padding: '2%'
                        }}>
                            <Card style={{
                                width: '30%',
                                backgroundColor: '#00caf5',
                                float: 'left'

                            }}>
                                <CardTitle title="Friends" />
                                <Card>
                                    <CardHeader
                                        title="asdf"
                                        avatar=""
                                    >
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader
                                        title="New User"
                                        avatar=""
                                    />
                                </Card>
                            </Card>
                            <Card style={{
                                float: 'right',
                                width: '68%',
                            }}>
                                <CardHeader title="My Status Messages" />
                                <Card>
                                    <div>
                                        {this.state.result}
                                    </div>
                                </Card>
                            </Card>
                        </div>
                    </Paper>
                </Paper>
            );
    }
}
function mapStateToProps(state: any, ownProps: any) {
    const { users} = state;
    return Object.assign({}, ownProps, { users});
}

const connectedbody = connect(mapStateToProps)(ProfilePage);
export { connectedbody as ProfilePage }; 