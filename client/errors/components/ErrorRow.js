import React, { PropTypes } from 'react';
import moment from 'moment';

if (process.env.BROWSER ) {
    require ("../../app/style/table.scss");
}

export default class ErrorRow extends React.PureComponent  {
    constructor(props){
        super(props);
        this.showErrorDetails = this.showErrorDetails.bind(this);
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

    showErrorDetails(event){
        event.preventDefault();
        this.props.setActiveError(this.props.cid, this.props.error);
    }

    render() {
        return (
            <tr>
                {
                    Object.keys(this.props.columns).map(k =>
                        <td key={this.props.error._id + k}>{this.getColValue(k, this.props.columns[k], this.props.error)}</td>
                    )
                }
                <td><a href="#" onClick={this.showErrorDetails}>Details</a></td>
                <td><a href="#" onClick={this.showErrorDetails}>Error</a></td>
            </tr>
        )
    }
}

ErrorRow.propTypes = {
    error: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
    cid: PropTypes.string.isRequired,
    setActiveError: PropTypes.func.isRequired
};
