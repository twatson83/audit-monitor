import React from 'react';
import MessagesContainer from '../../messages/containers/MessagesContainer';
import "../style/grid.scss";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="row__col--width-50">
                        <MessagesContainer audit={this.props.audit}
                                           height="500px" />
                    </div>
                </div>
                <div className="row">

                </div>
            </div>

        );
    }
}