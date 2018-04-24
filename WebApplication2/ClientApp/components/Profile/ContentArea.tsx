import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import  Paper  from 'material-ui/Paper';
import { Avatar, Card, CardTitle } from 'material-ui';
import { CardHeader } from 'material-ui/Card';
import { CardText } from 'material-ui/Card/CardText';
import { Redirect } from 'react-router';
import { parse } from 'query-string';
export class ContentArea extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        
    }
   
    render() {
        return (                    
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
                                        {this.props.result}
                                    </div>
                                </Card>
                            </Card>
                        </div>
                    </Paper>
            );
    }
}
//function mapStateToProps(state: any, ownProps: any) {
//    const { users} = state;
//    return Object.assign({}, ownProps, { users});
//}

//const connectedbody = connect(mapStateToProps)(ProfilePage);
//export { connectedbody as ProfilePage }; 