import React from 'react';
import MessagesContainer from '../../messages/containers/MessagesContainer';
import ErrorsContainer from '../../errors/containers/ErrorsContainer';

if (process.env.BROWSER ) {
    require ("../style/grid.scss");
}

export default class HomePage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="row__col--width-33">

                    </div>
                    <div className="row__col--width-66">
                        <div className="row">
                            <div className="row__col--width-100">
                                <MessagesContainer audit={this.props.audit}
                                                   height="500px" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="row__col--width-100">
                                <ErrorsContainer error={this.props.error}
                                                 height="500px" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}