import React, { PropTypes } from 'react';
import Panel from '../../panel/components';
import MessagesTableHeader from './MessagesTableHeader';
import MessageSearch from './MessagesSearch';
import MessageRow from './MessageRow';

import "../../app/style/table.scss";

export default class Messages extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.toggleStreaming(this.props.cid, this.props.requestOptions.started);
        this.props.fetchMessages(this.props.cid, this.props.requestOptions);
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
                        <div>
                            <i className="fa fa-envelope panel__icon"/>
                            <span className="panel__title">Audit Messages</span>
                            <MessageSearch cid={this.props.cid}
                                requesting={this.props.requesting}
                                requestOptions={this.props.requestOptions}
                                fetchMessages={this.props.fetchMessages}
                                toggleStreaming={this.props.toggleStreaming}/>
                        </div>
                    }
                body=
                    {
                        <table className="table messages-table">
                            <MessagesTableHeader cid={this.props.cid}
                                                 requestOptions={this.props.requestOptions}
                                                 columns={this.props.columns}
                                                 fetchMessages={this.props.fetchMessages}/>
                            <tbody>
                            {
                                this.props.requesting ?
                                    <tr>
                                        <td colSpan={Object.keys(this.props.columns).length + 2}>
                                            Loading..
                                        </td>
                                    </tr>
                                    :
                                    this.props.messages.map(m =>
                                        <MessageRow cid={this.props.cid}
                                                    columns={this.props.columns}
                                                    message={m}
                                                    setActiveMessage={this.props.setActiveMessage}
                                                    getSession={this.props.getSession} />
                                    )
                            }
                            </tbody>
                        </table>
                    }

            />
        )
    }
}

Messages.propTypes = {
    messages: PropTypes.array.isRequired,
    requesting: PropTypes.bool.isRequired,
    fetchMessages: PropTypes.func.isRequired,
    toggleStreaming: PropTypes.func.isRequired,
    requestOptions: PropTypes.shape({
        page: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        query: PropTypes.string,
        sortDirection: PropTypes.string.isRequired,
        sort: PropTypes.string.isRequired,
        start: PropTypes.string,
        end: PropTypes.string,
    }).isRequired,
    cid: PropTypes.string.isRequired,
    stopStream: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired,
    setActiveMessage: PropTypes.func.isRequired,
    getSession: PropTypes.func.isRequired,
    clearSession: PropTypes.func.isRequired
};
