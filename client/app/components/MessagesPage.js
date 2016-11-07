import React from 'react';
import MessagesContainer from '../../messages/containers/MessagesContainer';

export default class HomePage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MessagesContainer audit={this.props.audit} height="800px" />
        );
    }
}