import React, { PropTypes } from 'react';
import moment from 'moment';

import "../../app/style/table.scss";

export default class MessageRow extends React.Component {
    constructor(props){
        super(props);
        this.showSession = this.showSession.bind(this);
        this.showMessageDetails = this.showMessageDetails.bind(this);
    }

    getColValue(name, col, message) {
        switch (col.type){
            case "string":
                return message[name];
            case "datetime":
                return moment(message[name]).format("DD/MM/YYYY HH:mm:ss");
            default:
                return message[name];
        }
    }

    showSession(event){
        event.preventDefault();
        this.props.getSession(this.props.cid, this.props.message.CorrelationId);
    }

    showMessageDetails(event){
        event.preventDefault();
        this.props.setActiveMessage(this.props.cid, this.props.message);
    }

    render() {
        return (
            <tr key={this.props.message._id}>
                {
                    Object.keys(this.props.columns).map(k =>
                        <td key={this.props.message._id + k}>{this.getColValue(k, this.props.columns[k], this.props.message)}</td>
                    )
                }
                <td><a href="#" onClick={this.showSession}>Session</a></td>
                <td><a href="#" onClick={this.showMessageDetails}>Details</a></td>
            </tr>
        )
    }
}

MessageRow.propTypes = {
    message: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
    cid: PropTypes.string.isRequired
};
