import React, { PropTypes } from 'react';
import moment from 'moment';

if (process.env.BROWSER ) {
    require ("../../app/style/table.scss");
}

export default class MessageRow extends React.PureComponent  {
    constructor(props){
        super(props);
        this.showSession = this.showSession.bind(this);
    }

    getColValue(name, col, message) {
        switch (col.type){
            case "link":
                return <a href="#">{message[name]}</a>;
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

    render() {
        return (
            <tr>
                {
                    Object.keys(this.props.columns).map(k =>
                        <td className={this.props.message._id + k} key={this.props.message._id + k}>{this.getColValue(k, this.props.columns[k], this.props.message)}</td>
                    )
                }
                <td><a href="#" onClick={this.showSession}>Session</a></td>
            </tr>
        )
    }
}

MessageRow.propTypes = {
    message: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
    cid: PropTypes.string.isRequired
};
