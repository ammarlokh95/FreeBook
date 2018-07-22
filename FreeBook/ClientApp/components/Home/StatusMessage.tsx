import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Card, CardHeader, CardActions, FlatButton, CardTitle, CardMedia } from 'material-ui';
import { CardText } from 'material-ui/Card/CardText';

export class StatusMessage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(t: boolean) {
        this.setState({ Login: t });
    }
    render() {
        console.log("statusMes here")

        return (
            <Card style={{
                width: '95%', marginLeft: '2.5%'
            }}
                
            >
                <CardHeader
                    avatar=""
                    title={<a href={'/profile?username=' + this.props.username} style={{ color: '#000' }}>{this.props.username} said:</a>}
                    subtitle={"On  " + this.props.postDate}
                />
                    
                <CardTitle title={this.props.message}
                    titleStyle={{ textAlign: 'center' }}
                    />
            </Card>
        );
    }
}
