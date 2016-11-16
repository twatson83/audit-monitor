import React, { PropTypes } from 'react';
import MessagesTableHeader from './MessagesTableHeader';
import MessageRow from './MessageRow';

export default class MessagesTable extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <table className="table messages-table">
                <MessagesTableHeader cid={this.props.cid}
                                     requestOptions={this.props.requestOptions}
                                     columns={this.props.columns}
                                     fetchMessages={this.props.fetchMessages}/>
                <tbody>
                {
                    this.props.requesting ?
                        <tr>
                            <td className="loadingCell"
                                colSpan={Object.keys(this.props.columns).length + 2}>
                                Loading..
                            </td>
                        </tr>
                        :
                        this.props.messages.map(m =>
                            <MessageRow key={m._id}
                                        cid={this.props.cid}
                                        columns={this.props.columns}
                                        message={m}
                                        setActiveMessage={this.props.setActiveMessage}
                                        getSession={this.props.getSession} />
                        )
                }
                </tbody>
            </table>
        )
    }
}

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
