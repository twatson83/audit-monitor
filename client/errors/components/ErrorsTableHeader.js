import React, { PropTypes } from 'react';

if (process.env.BROWSER ) {
    require("../../app/style/table.scss");
    require("../style/errors-table.scss");
}

export default class ErrorsTableHeader extends React.PureComponent  {

    constructor(props) {
        super(props);
    }

    sort(col){
        var requestOptions = {...this.props.requestOptions};

        if (col === requestOptions.sort){
            if(requestOptions.sortDirection === "asc"){
                requestOptions.sortDirection = "desc";
            } else {
                requestOptions.sortDirection = "asc";
            }
        } else {
            requestOptions.sort = col;
            requestOptions.sortDirection = "asc";
        }

        this.props.fetchErrors(this.props.cid, requestOptions);
    }

    render() {
        return (
            <thead>
                <tr>
                    {
                        Object.keys(this.props.columns).map(k =>
                            <th key={'header_' + k} className={"errors-table__" + k + "-col"}>
                                <a href='#'
                                   onClick={e => { e.preventDefault(); this.sort(k);}}>
                                    {
                                        <span className="errors-table__col-text">
                                            {this.props.columns[k].Display}
                                        </span>
                                    }
                                    {
                                        this.props.requestOptions.sort === k ?
                                            this.props.requestOptions.sortDirection === "desc" ?
                                                <i className="fa fa-chevron-down errors-table__sort-icon"></i> :
                                                <i className="fa fa-chevron-up errors-table__sort-icon"></i>
                                            :
                                            ""
                                    }
                                </a>
                            </th>
                        )
                    }
                    <th className="errors-table__session-col"></th>
                </tr>
            </thead>
        );
    }
}

ErrorsTableHeader.propTypes = {
    columns: PropTypes.object.isRequired,
    fetchErrors: PropTypes.func.isRequired,
    requestOptions: React.PropTypes.shape({
        page: React.PropTypes.number.isRequired,
        pageSize: React.PropTypes.number.isRequired,
        query: React.PropTypes.string,
        sortDirection: React.PropTypes.string.isRequired,
        sort: React.PropTypes.string.isRequired,
        start: React.PropTypes.string,
        end: React.PropTypes.string,
    }).isRequired
};
