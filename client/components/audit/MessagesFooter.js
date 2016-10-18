import React, { PropTypes } from 'react';

export default class MessagesFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    previous(e){
        e.preventDefault();
        var requestOptions = {
            ...this.props.requestOptions,
            page: this.props.requestOptions.page - 1
        };
        this.props.fetchMessages(requestOptions);
    }

    next(e){
        e.preventDefault();
        var requestOptions = {
            ...this.props.requestOptions,
            page: this.props.requestOptions.page + 1
        };
        this.props.fetchMessages(requestOptions);
    }

    render() {
        return (
            <div>
                <span>
                    <a href="#"
                       onClick={this.props.requestOptions.page > 1 ?
                           this.previous.bind(this) : e => e.preventDefault()}>&lt;&lt;</a>
                </span>
                <span>
                    <a href="#"
                       onClick={this.props.requestOptions.hasMorePages ?
                           this.next.bind(this) : e => e.preventDefault()}>&gt;&gt;</a>
                </span>
            </div>
        );
    }
}

MessagesFooter.propTypes = {
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
