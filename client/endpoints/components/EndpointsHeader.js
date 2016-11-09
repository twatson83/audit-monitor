import React, { PropTypes } from 'react';
import EndpointsSearch from './EndpointsSearch';

export default class EndpointsHeader extends React.PureComponent {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <i className="fa fa-share-alt panel__icon"/>
                <span className="panel__title">Endpoints</span>
                <EndpointsSearch cid={this.props.cid}
                                requesting={this.props.requesting}
                                requestOptions={this.props.requestOptions}
                                fetchEndpoints={this.props.fetchEndpoints}
                                toggleStreaming={this.props.toggleStreaming}/>
            </div>
        )
    }
}

EndpointsHeader.propTypes = {
    requestOptions: React.PropTypes.shape({
        query: React.PropTypes.string,
        sortDirection: React.PropTypes.string.isRequired,
        sort: React.PropTypes.string.isRequired
    }).isRequired,
    fetchEndpoints: React.PropTypes.func.isRequired,
    toggleStreaming: React.PropTypes.func.isRequired,
};