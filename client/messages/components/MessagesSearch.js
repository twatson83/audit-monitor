import React, { PropTypes } from 'react';
import debounce from '../../utils/debounce';
import DateTime from 'react-datetime';
import moment from 'moment';

if (process.env.BROWSER ) {
    require("../style/messages-search.scss");
    require("../../app/style/datetime.scss");
    require("../../app/style/input.scss");
    require("../../panel/style/panel.scss");
    require("../../app/style/button.scss");
}

export default class MessagesSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...this.props.requestOptions};
        this.search = debounce(this.search,250);
        this.queryChange = this.queryChange.bind(this);
        this.search = this.search.bind(this);
        this.startDateChange = this.startDateChange.bind(this);
        this.endDateChange = this.endDateChange.bind(this);
    }

    queryChange(event){
        this.setState({
            ...this.state,
            query: event.target.value
        });
        this.search();
    }

    startDateChange(date){
        this.setState({
            ...this.state,
            start: date.format()
        });

        if(this.state.end){
            this.search();
        }
    }

    endDateChange(date){
        this.setState({
            ...this.state,
            end: date.format()
        });
        if(this.state.start){
            this.search();
        }
    }

    search(){
        this.props.fetchMessages(this.props.cid, this.state);
    }

    previous(e){
        e.preventDefault();
        var requestOptions = {
            ...this.props.requestOptions,
            page: this.props.requestOptions.page - 1
        };
        this.props.fetchMessages(this.props.cid, requestOptions);
    }

    next(e){
        e.preventDefault();
        var requestOptions = {
            ...this.props.requestOptions,
            page: this.props.requestOptions.page + 1
        };
        this.props.fetchMessages(this.props.cid, requestOptions);
    }

    toggleStreaming(e){
        e.preventDefault();
        this.props.toggleStreaming(this.props.cid, !this.props.requestOptions.started);
    }

    render() {
        return (
            <div className="panel__heading-options messages-search">
                <label className="messages-search__label">Start Date</label>
                <DateTime className="messages-search__date"
                          onChange={this.startDateChange}
                          value={this.state.start ? moment(this.state.start) : ""}
                          closeOnSelect={true}/>

                <label className="messages-search__label">End Date</label>
                <DateTime className="messages-search__date"
                          onChange={this.endDateChange}
                          value={this.state.end ? moment(this.state.end) : ""}
                          closeOnSelect={true}/>

                <label className="messages-search__label">Search</label>
                <input className="messages-search__input"
                       type="text"
                       onChange={this.queryChange} value={this.state.query}/>


                <button className={
                            this.props.requestOptions.page <= 1 ?
                                "messages-search__button button button--small button--disabled" :
                                "messages-search__button button button--small"
                        }
                        href="#"
                        onClick={this.props.requestOptions.page > 1 ?
                        this.previous.bind(this) : e => e.preventDefault()}>
                    <i className="fa fa-chevron-left"></i>
                </button>

                <button className={
                            !this.props.requestOptions.hasMorePages ?
                                "messages-search__button button button--small button--disabled" :
                                "messages-search__button button button--small"
                        }
                        href="#"
                        onClick={this.props.requestOptions.hasMorePages ?
                            this.next.bind(this) : e => e.preventDefault()}>
                    <i className="fa fa-chevron-right"></i>
                </button>

                <button className="messages-search__button button button--small"
                        href="#"
                        onClick={this.toggleStreaming.bind(this)}>
                    <i className={
                        this.props.requestOptions.started ?
                            "messages-search__stop-start fa fa-stop" : "messages-search__stop-start fa fa-play"
                    }></i>

                </button>

                <button className="messages-search__button button button--small messages-search__button--last"
                        href="#"
                        onClick={e => { e.preventDefault(); this.search(); }}>
                    <i className={this.props.requesting ? "fa fa-refresh fa-spin" : "fa fa-refresh"} ></i>
                </button>
            </div>
        );
    }
}

MessagesSearch.propTypes = {
    requestOptions: React.PropTypes.shape({
        page: React.PropTypes.number.isRequired,
        pageSize: React.PropTypes.number.isRequired,
        query: React.PropTypes.string,
        sortDirection: React.PropTypes.string.isRequired,
        sort: React.PropTypes.string.isRequired,
        start: React.PropTypes.string,
        end: React.PropTypes.string,
    }).isRequired,
    fetchMessages: React.PropTypes.func.isRequired,
    toggleStreaming: React.PropTypes.func.isRequired,
};
