import React, { PropTypes } from 'react';
import MessageSearch from './MessagesSearch';

const MessagesHeader = props => {
    return (
        <div>
            <i className="fa fa-envelope panel__icon"/>
            <span className="panel__title">Audit Messages</span>
            <MessageSearch cid={props.cid}
                           requesting={props.requesting}
                           requestOptions={props.requestOptions}
                           fetchMessages={props.fetchMessages}
                           toggleStreaming={props.toggleStreaming}/>
        </div>
    )
};

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


export default MessagesHeader;
