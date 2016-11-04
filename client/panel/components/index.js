import React, { PropTypes } from 'react';
if (process.env.BROWSER ) {
    require("../style/panel.scss");
}

export default class Panel extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="panel">
                <div className="panel__heading">
                    {this.props.heading}
                </div>
                <div className="panel__body" style={{height: this.props.height}}>
                    {this.props.body}
                </div>
            </div>
        )
    }
}
