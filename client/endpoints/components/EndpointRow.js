import React, { PropTypes } from 'react';

if (process.env.BROWSER ) {
    require ("../../app/style/table.scss");
}

export default class ErrorRow extends React.PureComponent  {
    constructor(props){
        super(props);
    }

    getColValue(name, col, message) {
        switch (col.type){
            case "string":
                return message[name];
            case "link":
                return <a href="#">{message[name]}</a>;
            case "decimal":
                return parseFloat(Math.round(message[name] * 100) / 100).toFixed(2);
            case "memory":
                return parseFloat(Math.round((message[name] / 1048576) * 100) / 100).toFixed(2) ;
            default:
                return message[name];
        }
    }

    render() {
        return (
            <tr>
                {
                    Object.keys(this.props.columns).map(k =>
                        <td key={this.props.endpoint._id + k}>
                            {this.getColValue(k, this.props.columns[k], this.props.endpoint)}
                        </td>
                    )
                }
            </tr>
        )
    }
}

ErrorRow.propTypes = {
    endpoint: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
    cid: PropTypes.string.isRequired
};
