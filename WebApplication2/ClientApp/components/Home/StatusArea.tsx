import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { statusActions } from '../../_actions';
import { statusConstants } from '../../_constants';
import FlatButton from 'material-ui/RaisedButton';
import EnhancedTextArea from 'material-ui/TextField';
import { Paper, Card, CardHeader, CardActions } from 'material-ui';
import EnhancedButton from 'material-ui/internal/EnhancedButton';

class StatusArea extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = { message: '' };
        this.handleChange = this.handleChange.bind(this);
        this.submitNewStatus = this.submitNewStatus.bind(this);     
    }
    handleChange(e: any) {
        const { value } = e.target;
        this.setState({ message: value, error:'' });
    }
    submitNewStatus(): any {
        var dispatch = this.props.dispatch;
        var uname = this.props.username;
        if (this.state.message != '') {
            const content = {
                username: uname, message: this.state.message
            };

            dispatch(statusActions.success(content));
        }
        else this.setState({error:"Status cannot be Empty"})
        this.setState({ message : '' });
    }

    render() {

        return (
            <Paper zDepth={5} style={{
                height: '100%', width: '100%', backgroundColor: '#75aaff', alignSelf: 'center', textAlign: 'center', marginTop: '2%'
            }} >
                <Card style={{
                    margin: '3%',
                    marginTop:'1%'
                }}>
                    <div className="StatusArea" >
                        <CardHeader avatar="" >
                        <EnhancedTextArea value={this.state.message} rowsMax={2} hintText="Enter Status" errorText={this.state.error} onChange={(e) => { this.handleChange(e) }} />
                        </CardHeader>
                        <br />
                        <CardActions>
                            <EnhancedButton style={{ width: '20%', height: '20%', marginBottom: '1%' }} onClick={this.submitNewStatus} > Submit Status</EnhancedButton>
                        </CardActions>
                    </div>
                </Card>
            </Paper>
        );
    }
}


function mapStateToProps(state: any, ownProps: any) {
    const { status } = state;
    return Object.assign({}, ownProps, { status });
}
const connectedLoginPage = connect(mapStateToProps)(StatusArea);
export { connectedLoginPage as StatusArea }; 