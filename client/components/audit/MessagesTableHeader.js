import React, { PropTypes } from 'react';

export default class MessagesTableHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchMessages(this.props.requestOptions);
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

        this.props.fetchMessages(requestOptions);
    }

    render() {
        return (
            <thead>
                <tr>
                    {
                        Object.keys(this.props.columns).map(k =>
                            <th key={'header_' + k}>
                                <a href='#'
                                   onClick={e => { e.preventDefault(); this.sort(k);}}>
                                    {this.props.columns[k].Display} &nbsp;
                                    {this.props.requestOptions.sort === k ?
                                        <span>{ this.props.requestOptions.sortDirection === "desc" ? "V" : "^"}</span>
                                        :
                                        "" }
                                </a>
                            </th>
                        )
                    }
                </tr>
            </thead>
        );
    }
}

MessagesTableHeader.propTypes = {
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
