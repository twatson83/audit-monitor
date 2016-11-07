import React from 'react';
import ErrorsContainer from '../../errors/containers/ErrorsContainer';

export default class ErrorPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ErrorsContainer error={this.props.error} height="800px" />
        );
    }
}