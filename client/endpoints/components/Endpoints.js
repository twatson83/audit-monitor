import React, { PropTypes } from 'react';
import Panel from '../../panel/components';
import EndpointsHeader from './EndpointsHeader';
import EndpointsTable from './EndpointsTable';

if (process.env.BROWSER ) {
    require("../../app/style/table.scss");
}

export default class Endpoints extends React.PureComponent  {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.toggleStreaming(this.props.cid, this.props.requestOptions.started);
        if (!this.props.requestOptions.serverRendered){
            this.props.fetchEndpoints(this.props.cid, this.props.requestOptions);
        } else {
            this.props.clearServerRendered(this.props.cid);
        }
    }

    componentWillUnmount() {
        this.props.stopStream();
    }

    render() {
        return (
            <Panel
                height={this.props.height}
                heading=
                    {
                        <EndpointsHeader cid={this.props.cid}
                                         requesting={this.props.requesting}
                                         requestOptions={this.props.requestOptions}
                                         fetchEndpoints={this.props.fetchEndpoints}
                                         toggleStreaming={this.props.toggleStreaming}/>
                    }
                body=
                    {
                        <EndpointsTable cid={this.props.cid}
                                        requestOptions={this.props.requestOptions}
                                        columns={this.props.columns}
                                        endpoints={this.props.endpoints}
                                        fetchEndpoints={this.props.fetchEndpoints}
                                        requesting={this.props.requesting}/>

                    }
            />
        )
    }
}

Endpoints.propTypes = {
    endpoints: PropTypes.object.isRequired,
    requesting: PropTypes.bool.isRequired,
    fetchEndpoints: PropTypes.func.isRequired,
    toggleStreaming: PropTypes.func.isRequired,
    requestOptions: PropTypes.shape({
        query: PropTypes.string,
        sortDirection: PropTypes.string.isRequired,
        sort: PropTypes.string.isRequired
    }).isRequired,
    cid: PropTypes.string.isRequired,
    stopStream: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired,
    clearServerRendered: PropTypes.func.isRequired
};
