import React, { PropTypes } from 'react';
import EndpointsTableHeader from './EndpointsTableHeader';
import EndpointRow from './EndpointRow';

export default class ErrorsTable extends React.PureComponent {
    constructor(props){
        super(props);
        this.getEndpointRow = this.getEndpointRow.bind(this);
    }

    getEndpointRow(key){
        return (
            <EndpointRow key={this.props.endpoints[key]._id}
                         cid={this.props.cid}
                         columns={this.props.columns}
                         endpoint={this.props.endpoints[key]}/>
        )
    }

    render(){
        return (
            <table className="table endpoints-table">
                <EndpointsTableHeader cid={this.props.cid}
                                   requestOptions={this.props.requestOptions}
                                   columns={this.props.columns}
                                   fetchEndpoints={this.props.fetchEndpoints}/>
                <tbody>
                {
                    this.props.requesting ?
                        <tr>
                            <td colSpan={Object.keys(this.props.columns).length + 2}>
                                Loading..
                            </td>
                        </tr>
                        :
                        Object.keys(this.props.endpoints).map(k => this.getEndpointRow(k))
                }
                </tbody>
            </table>
        )
    }
}

ErrorsTable.propTypes = {
    columns: PropTypes.object.isRequired,
    cid: PropTypes.string.isRequired,
    fetchEndpoints: PropTypes.func.isRequired,
    requestOptions: React.PropTypes.shape({
        query: React.PropTypes.string,
        sortDirection: React.PropTypes.string.isRequired,
        sort: React.PropTypes.string.isRequired
    }).isRequired,
    endpoints: React.PropTypes.object.isRequired,
    requesting: React.PropTypes.bool.isRequired
};
