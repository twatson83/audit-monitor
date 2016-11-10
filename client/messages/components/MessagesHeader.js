import React, { PropTypes } from 'react';
import MessageSearch from './MessagesSearch';

if (process.env.BROWSER ) {
    require ("../style/messages-header.scss");
}

export default class MessagesHeader extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="messages-header">
                <i className="fa fa-envelope panel__icon"/>
                <span className="panel__title">Audit Messages</span>
                <MessageSearch cid={this.props.cid}
                               requesting={this.props.requesting}
                               requestOptions={this.props.requestOptions}
                               fetchMessages={this.props.fetchMessages}
                               toggleStreaming={this.props.toggleStreaming}/>
            </div>
        )
    }
}

MessagesHeader.propTypes = {
    requestOptions: React.PropTypes.shape({
        page: React.PropTypes.number.isRequired,
        pageSize: React.PropTypes.number.isRequired,
        query: React.PropTypes.string,
        sortDirection: React.PropTypes.string.isRequired,
        sort: React.PropTypes.string.isRequired,
        start: React.PropTypes.string,
        end: React.PropTypes.string,
    }).isRequired,
    fetchMessages: React.PropTypes.func.isRequired,
    toggleStreaming: React.PropTypes.func.isRequired,
};

