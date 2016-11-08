import React from 'react';
import EndpointsContainer from '../../endpoints/containers/EndpointsContainer';

export default class ErrorPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <EndpointsContainer endpoint={this.props.endpoint} height="800px" />
        );
    }
}