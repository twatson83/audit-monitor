import React from 'react';
import MessagesContainer from '../../messages/containers/MessagesContainer';
import ErrorsContainer from '../../errors/containers/ErrorsContainer';
import EndpointsContainer from '../../endpoints/containers/EndpointsContainer';

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
                    <div className="row__col row__col--width-33">
                        <EndpointsContainer endpoint={this.props.endpoint}
                                            height="925px" />
                    </div>
                    <div className="row__col row__col--width-66">
                        <div className="row">
                            <div className="row__col row__col--width-100">
                                <MessagesContainer audit={this.props.audit}
                                                   height="450px" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="row__col row__col--width-100">
                                <ErrorsContainer error={this.props.error}
                                                 height="445px" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}