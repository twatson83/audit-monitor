import React, { PropTypes } from 'react';
import Panel from '../../panel/components';
import ErrorsHeader from './ErrorsHeader';
import ErrorsTable from './ErrorsTable';

if (process.env.BROWSER ) {
    require("../../app/style/table.scss");
}

export default class Errors extends React.PureComponent  {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.toggleStreaming(this.props.cid, this.props.requestOptions.started);
        this.props.fetchErrors(this.props.cid, this.props.requestOptions);
    }

    componentWillUnmount() {
        this.props.stopStream();
    }

    render() {
        return (
            <Panel
                height={this.props.height}
                heading=
                    {
                        <ErrorsHeader cid={this.props.cid}
                                      requesting={this.props.requesting}
                                      requestOptions={this.props.requestOptions}
                                      fetchErrors={this.props.fetchErrors}
                                      toggleStreaming={this.props.toggleStreaming}/>
                    }
                body=
                    {
                        <ErrorsTable cid={this.props.cid}
                                     requestOptions={this.props.requestOptions}
                                     columns={this.props.columns}
                                     errors={this.props.errors}
                                     fetchErrors={this.props.fetchErrors}
                                     setActiveError={this.props.setActiveError}
                                     requesting={this.props.requesting}/>

                    }
            />
        )
    }
}

Errors.propTypes = {
    errors: PropTypes.array.isRequired,
    requesting: PropTypes.bool.isRequired,
    fetchErrors: PropTypes.func.isRequired,
    toggleStreaming: PropTypes.func.isRequired,
    requestOptions: PropTypes.shape({
        page: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        query: PropTypes.string,
        sortDirection: PropTypes.string.isRequired,
        sort: PropTypes.string.isRequired,
        start: PropTypes.string,
        end: PropTypes.string,
    }).isRequired,
    cid: PropTypes.string.isRequired,
    stopStream: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired,
    setActiveError: PropTypes.func.isRequired
};
