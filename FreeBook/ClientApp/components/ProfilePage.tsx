import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import  Paper  from 'material-ui/Paper';
import { Avatar, Card, CardTitle } from 'material-ui';
import { CardHeader } from 'material-ui/Card';
import { CardText } from 'material-ui/Card/CardText';
import { userActions, friendActions } from '../_actions';
import { StatusMessage } from './Home/StatusMessage';
import { Redirect } from 'react-router';
import { parse } from 'query-string';
import { AboutArea } from './Profile/AboutArea';
import { ContentArea } from './Profile/ContentArea';
class ProfilePage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        var user;
        this.state = {
            usersProfile: {},
            result: [],
            friendStatus:''
        }
        try {
            user = (window as any).localStorage.getItem('user');
            if (user) {
                user = JSON.parse(user)
            }
            else {
                this.setState({});
                return;
            }
        }
        catch (err) {
        }
        var username = parse(this.props.location.search).username;
        if (username) {
            console.log(username)
            if (username == user.username) {
                this.props.dispatch(userActions.getUserInfo(username));
            }
            else {
                this.props.dispatch(userActions.getUserInfoAndFriendStat(username, user.username));
            }
        }
        else {
            
        }
                

        this.formatDate = this.formatDate.bind(this);
        this.addUserAsFriend = this.addUserAsFriend.bind(this);
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
                usersProfile: user,
                result: tempRes,
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

    addUserAsFriend(un:string, fun:string) {
        this.props.dispatch(friendActions.sendFriendRequest(un, fun));
    }
    render() {
        var myProfile = false;
        var user;
        try {
            user = (window as any).localStorage.getItem('user');
            if (user) {
                user = JSON.parse(user)
                if (this.state.usersProfile.username == user.username)
                    myProfile = true;
            }
            else {
                return <Redirect to="/login" />
            }

        }
        catch (err) {

        }
        return (
            <Paper zDepth={4} style={{ height: 'auto', width: '-webkit-fill-available', backgroundColor: '#75aaff', alignSelf: 'center', marginTop: '2%' }} >
                <AboutArea firstname={this.state.usersProfile.firstname} lastname={this.state.usersProfile.lastname} joinDate={this.state.usersProfile.joinDate} isMyProfile={myProfile} friendStatus={this.state.friendStatus} addUserAsFriend={this.addUserAsFriend} />
                <ContentArea result={this.state.result} />
            </Paper>
        );
        
    }
}
function mapStateToProps(state: any, ownProps: any) {
    const { users, friend} = state;
    return Object.assign({}, ownProps, { users, friend});
}

const connectedbody = connect(mapStateToProps)(ProfilePage);
export { connectedbody as ProfilePage }; 