import React, { PropTypes } from 'react';
import debounce from '../../utils/debounce';
import DateTime from 'react-datetime';
import moment from 'moment';

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
        this.props.fetchMessages(this.state);
    }

    render() {
        return (
            <div>
                <div>
                    <label>Search</label>
                    <input type="text" onChange={this.queryChange} value={this.state.query}/>
                </div>
                <div>
                    <label>Start Date</label>
                    <DateTime onChange={this.startDateChange}
                              value={this.state.start ? moment(this.state.start) : ""}
                              closeOnSelect={true}/>
                </div>
                <div>
                    <label>End Date</label>
                    <DateTime onChange={this.endDateChange}
                              value={this.state.end ? moment(this.state.end) : ""}
                              closeOnSelect={true}/>
                </div>
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
    }).isRequired
};
