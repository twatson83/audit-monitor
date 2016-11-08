import React, { PropTypes } from 'react';

if (process.env.BROWSER ) {
    require("../../app/style/table.scss");
    require("../style/endpoint-table.scss");
}

export default class EndpointsTableHeader extends React.PureComponent  {

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

        this.props.fetchEndpoints(this.props.cid, requestOptions);
    }

    render() {
        return (
            <thead>
                <tr>
                    {
                        Object.keys(this.props.columns).map(k =>
                            <th key={'header_' + k} className={"endpoints-table__" + k + "-col"}>
                                <a href='#'
                                   onClick={e => { e.preventDefault(); this.sort(k);}}>
                                    {
                                        <span className="endpoints-table__col-text">
                                            {this.props.columns[k].Display}
                                        </span>
                                    }
                                    {
                                        this.props.requestOptions.sort === k ?
                                            this.props.requestOptions.sortDirection === "desc" ?
                                                <i className="fa fa-chevron-down endpoints-table__sort-icon"></i> :
                                                <i className="fa fa-chevron-up endpoints-table__sort-icon"></i>
                                            :
                                            ""
                                    }
                                </a>
                            </th>
                        )
                    }
                </tr>
            </thead>
        );
    }
}

EndpointsTableHeader.propTypes = {
    columns: PropTypes.object.isRequired,
    fetchEndpoints: PropTypes.func.isRequired,
    requestOptions: React.PropTypes.shape({
        query: React.PropTypes.string,
        sortDirection: React.PropTypes.string.isRequired,
        sort: React.PropTypes.string.isRequired
    }).isRequired
};
