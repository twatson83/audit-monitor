import React, { PropTypes } from 'react';
import debounce from '../../utils/debounce';

if (process.env.BROWSER ) {
    require("../style/endpoint-search.scss");
    require("../../app/style/datetime.scss");
    require("../../app/style/input.scss");
    require("../../panel/style/panel.scss");
    require("../../app/style/button.scss");
}

export default class EndpointsSearch extends React.PureComponent  {
    constructor(props) {
        super(props);
        this.state = {...this.props.requestOptions};
        this.search = debounce(this.search,250);
        this.queryChange = this.queryChange.bind(this);
        this.search = this.search.bind(this);
    }

    queryChange(event){
        this.setState({
            ...this.state,
            query: event.target.value
        });
        this.search();
    }

    search(){
        this.props.fetchEndpoints(this.props.cid, this.state);
    }

    toggleStreaming(e){
        e.preventDefault();
        this.props.toggleStreaming(this.props.cid, !this.props.requestOptions.started);
    }

    render() {
        return (
            <div className="panel__heading-options endpoints-search">
               
                <label className="endpoints-search__label">Search</label>
                <input className="endpoints-search__input"
                       type="text"
                       onChange={this.queryChange} value={this.state.query}/>
                
                <button className="endpoints-search__button button button--small"
                        href="#"
                        onClick={this.toggleStreaming.bind(this)}>
                    <i className={
                        this.props.requestOptions.started ?
                            "endpoints-search__stop-start fa fa-stop" : "endpoints-search__stop-start fa fa-play"
                    }></i>

                </button>

                <button className="endpoints-search__button button button--small endpoints-search__button--last"
                        href="#"
                        onClick={e => { e.preventDefault(); this.search(); }}>
                    <i className={this.props.requesting ? "fa fa-refresh fa-spin" : "fa fa-refresh"} ></i>
                </button>
            </div>
        );
    }
}

EndpointsSearch.propTypes = {
    requestOptions: React.PropTypes.shape({
        query: React.PropTypes.string,
        sortDirection: React.PropTypes.string.isRequired,
        sort: React.PropTypes.string.isRequired
    }).isRequired,
    fetchEndpoints: React.PropTypes.func.isRequired,
    toggleStreaming: React.PropTypes.func.isRequired,
};
