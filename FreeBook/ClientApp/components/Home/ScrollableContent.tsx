import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { fetch } from 'domain-task/fetch';
import { render } from 'react-dom';
import { StatusMessage } from './StatusMessage';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

export class ScrollableContent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            result: [],
        };
        try {
            var lastFetch = (window as any).localStorage.getItem("lastFetch");
            if (!lastFetch) 
            {
                (window as any).localStorage.setItem("lastFetch", 0);
            }
        }
        catch(err) {
            console.log("localStorage not found");
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.fetchAllStatuses = this.fetchAllStatuses.bind(this);
    }
    //result: any[] = [];
    onChange(t: boolean) {
        this.setState({ Login: t });
    }
    componentDidMount(): any {
        this.fetchAllStatuses();
    }

    fetchAllStatuses(): any {
        var tempRes: any[] = [];
        var lastFetch;
        try {
            lastFetch = (window as any).localStorage.getItem("lastFetch");
            if (lastFetch)
                lastFetch = JSON.parse(lastFetch)
            else lastFetch = 0;
        }
        catch(err){
            lastFetch = 0;
        }
        console.log(lastFetch);
        fetch('api/status/getallstatus/?last_fetch=' + lastFetch, { method: "GET" })
            .then((response) => {
                // console.log("Received Response" + response);
                return response.json();
            })
            .then((myJson: any) => {
                //var content = JSON.parse(myJson);
                // console.log(myJson);
                var i = 0;
                tempRes = myJson.map((res: any) => {
                    console.log(res);
                    var date = new Date(Date.parse(res.postDate));
                    var mydate = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + " at " + date.getHours() + ":" + date.getMinutes();
                    return <StatusMessage username={res.username} message={res.message} postDate={mydate} />
                });
                try {
                    (window as any).localStorage.setItem("lastFetch", Date.now());
                }
                catch (err) {
                    console.log("localStorage not found");
                }
                tempRes.push(this.state.result)
                this.setState({ result: tempRes});
            })
            .catch((err) => {
                return;
            });
    }
    componentWillReceiveProps(nextProps:any) {
        if (nextProps.status.success) {
            this.fetchAllStatuses();
        }
    }
   
    render() {

        return (
            <Paper zDepth={3} style={{ height: '100%', width: '-webkit-fill-available', backgroundColor: '#75aaff', alignSelf: 'center', margin: '1%' }}>
                <br />
                <div style={{ margin:'1%' }}>
                    {this.state.result}
                </div>
            </Paper>
        );
    }
}

//function mapStateToProps(state: any) {
//    const { status } = state;
//    return {
//        status
//    };
//}

//const connectedLoginPage = connect(mapStateToProps)(ScrollableContent);
//export { connectedLoginPage as ScrollableContent }; 