import React, { PropTypes } from 'react';
import ErrorsTableHeader from './ErrorsTableHeader';
import ErrorRow from './ErrorRow';

export default class ErrorsTable extends React.PureComponent {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <table className="table errors-table">
                <ErrorsTableHeader cid={this.props.cid}
                                   requestOptions={this.props.requestOptions}
                                   columns={this.props.columns}
                                   fetchErrors={this.props.fetchErrors}/>
                <tbody>
                {
                    this.props.requesting ?
                        <tr>
                            <td colSpan={Object.keys(this.props.columns).length + 2}>
                                Loading..
                            </td>
                        </tr>
                        :
                        this.props.errors.map(m =>
                            <ErrorRow key={m._id}
                                      cid={this.props.cid}
                                      columns={this.props.columns}
                                      error={m}
                                      setActiveError={this.props.setActiveError} />
                        )
                }
                </tbody>
            </table>
        )
    }
}

ErrorsTable.propTypes = {
    columns: PropTypes.object.isRequired,
    cid: PropTypes.string.isRequired,
    fetchErrors: PropTypes.func.isRequired,
    requestOptions: React.PropTypes.shape({
        page: React.PropTypes.number.isRequired,
        pageSize: React.PropTypes.number.isRequired,
        query: React.PropTypes.string,
        sortDirection: React.PropTypes.string.isRequired,
        sort: React.PropTypes.string.isRequired,
        start: React.PropTypes.string,
        end: React.PropTypes.string,
    }).isRequired,
    errors: React.PropTypes.array,
    requesting: React.PropTypes.bool.isRequired,
    setActiveError: React.PropTypes.func.isRequired
};
