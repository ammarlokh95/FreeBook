import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import  Paper  from 'material-ui/Paper';
import { Avatar, Card, CardTitle, CardActions, FlatButton } from 'material-ui';
import { CardHeader } from 'material-ui/Card';
import { CardText } from 'material-ui/Card/CardText';
import { Redirect } from 'react-router';
import { parse } from 'query-string';
export class AboutArea extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        var user;
        this.state = {
            areFriends:false
        }
        this.formatDate = this.formatDate.bind(this);
        this.showAddFriendButton = this.showAddFriendButton.bind(this);
    }
    formatDate(dateTime: any): string {
        var date = new Date(Date.parse(dateTime));
        var myDate = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + " at " + date.getHours() + ":" + date.getMinutes()
        return myDate;
    }
    showAddFriendButton():any {
        if (this.props.isMyProfile == false) {
            return <CardActions> <FlatButton label="Add As Friend" /> </CardActions>

        }
        else return null;
    }
    render() {
        return (
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
                    <CardTitle title={this.props.firstname + " " + this.props.lastname} subtitle={"Join Date: " + this.formatDate(this.props.joinDate)} />
                    {this.showAddFriendButton()}
                </Card>
            </Paper>
                    
            );
    }
}
//function mapStateToProps(state: any, ownProps: any) {
//    const { users} = state;
//    return Object.assign({}, ownProps, { users});
//}

//const connectedbody = connect(mapStateToProps)(AboutArea);
//export { connectedbody as AboutArea }; 