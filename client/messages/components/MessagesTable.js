import React, { PropTypes } from 'react';
import MessagesTableHeader from './MessagesTableHeader';
import MessageRow from './MessageRow';

const MessagesTable = props => {
    return (
        <table className="table messages-table">
            <MessagesTableHeader cid={props.cid}
                                 requestOptions={props.requestOptions}
                                 columns={props.columns}
                                 fetchMessages={props.fetchMessages}/>
            <tbody>
            {
                props.requesting ?
                    <tr>
                        <td colSpan={Object.keys(props.columns).length + 2}>
                            Loading..
                        </td>
                    </tr>
                    :
                    props.messages.map(m =>
                        <MessageRow key={m._id}
                                    cid={props.cid}
                                    columns={props.columns}
                                    message={m}
                                    setActiveMessage={props.setActiveMessage}
                                    getSession={props.getSession} />
                    )
            }
            </tbody>
        </table>
    )
};

MessagesTable.propTypes = {
    columns: PropTypes.object.isRequired,
    cid: PropTypes.string.isRequired,
    fetchMessages: PropTypes.func.isRequired,
    requestOptions: React.PropTypes.shape({
        page: React.PropTypes.number.isRequired,
        pageSize: React.PropTypes.number.isRequired,
        query: React.PropTypes.string,
        sortDirection: React.PropTypes.string.isRequired,
        sort: React.PropTypes.string.isRequired,
        start: React.PropTypes.string,
        end: React.PropTypes.string,
    }).isRequired,
    messages: React.PropTypes.array,
    requesting: React.PropTypes.bool.isRequired
};

export default MessagesTable;
