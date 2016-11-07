import React, { PropTypes } from 'react';
import ErrorsSearch from './ErrorsSearch';

export default class ErrorsHeader extends React.PureComponent {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <i className="fa fa-exclamation-circle panel__icon"/>
                <span className="panel__title">Error Messages</span>
                <ErrorsSearch cid={this.props.cid}
                              requesting={this.props.requesting}
                              requestOptions={this.props.requestOptions}
                              fetchErrors={this.props.fetchErrors}
                              toggleStreaming={this.props.toggleStreaming}/>
            </div>
        )
    }
}

ErrorsHeader.propTypes = {
    requestOptions: React.PropTypes.shape({
        page: React.PropTypes.number.isRequired,
        pageSize: React.PropTypes.number.isRequired,
        query: React.PropTypes.string,
        sortDirection: React.PropTypes.string.isRequired,
        sort: React.PropTypes.string.isRequired,
        start: React.PropTypes.string,
        end: React.PropTypes.string,
    }).isRequired,
    fetchErrors: React.PropTypes.func.isRequired,
    toggleStreaming: React.PropTypes.func.isRequired,
};