import React, { PropTypes } from 'react';
import Panel from '../../panel/components';
import MessagesHeader from './MessagesHeader';
import MessagesTable from './MessagesTable';

if (process.env.BROWSER ) {
    require("../../app/style/table.scss");
}

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
                        <MessagesHeader cid={this.props.cid}
                                        requesting={this.props.requesting}
                                        requestOptions={this.props.requestOptions}
                                        fetchMessages={this.props.fetchMessages}
                                        toggleStreaming={this.props.toggleStreaming}/>
                    }
                body=
                    {
                        <MessagesTable cid={this.props.cid}
                                       requestOptions={this.props.requestOptions}
                                       columns={this.props.columns}
                                       messages={this.props.messages}
                                       fetchMessages={this.props.fetchMessages}
                                       setActiveMessage={this.props.setActiveMessage}
                                       getSession={this.props.getSession}
                                       requesting={this.props.requesting}/>

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
