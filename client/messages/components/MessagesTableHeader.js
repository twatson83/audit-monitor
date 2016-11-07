import React, { PropTypes } from 'react';

if (process.env.BROWSER ) {
    require("../../app/style/table.scss");
    require("../style/messages-table.scss");
}

export default class MessagesTableHeader extends React.PureComponent  {

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

        this.props.fetchMessages(this.props.cid, requestOptions);
    }

    render() {
        return (
            <thead>
                <tr>
                    {
                        Object.keys(this.props.columns).map(k =>
                            <th key={'header_' + k} className={"messages-table__" + k + "-col"}>
                                <a href='#'
                                   onClick={e => { e.preventDefault(); this.sort(k);}}>
                                    {
                                        <span className="messages-table__col-text">
                                            {this.props.columns[k].Display}
                                        </span>
                                    }
                                    {
                                        this.props.requestOptions.sort === k ?
                                            this.props.requestOptions.sortDirection === "desc" ?
                                                <i className="fa fa-chevron-down messages-table__sort-icon"></i> :
                                                <i className="fa fa-chevron-up messages-table__sort-icon"></i>
                                            :
                                            ""
                                    }
                                </a>
                            </th>
                        )
                    }
                    <th className="messages-table__session-col"></th>
                    <th className="messages-table__details-col"></th>
                </tr>
            </thead>
        );
    }
}

MessagesTableHeader.propTypes = {
    columns: PropTypes.object.isRequired,
    fetchMessages: PropTypes.func.isRequired,
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
