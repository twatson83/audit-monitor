import React from 'react';
import MessagesContainer from '../containers/audit/MessagesContainer';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setPage();
    }

    render() {
        return (
            <div>
                <h2>Audit Messages</h2>
                <MessagesContainer />
            </div>
        );
    }
}
