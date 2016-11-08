import React from "react";
import {connect} from "react-redux";

import { requestEndpoints, toggleStreaming, stopStream, clearServerRendered } from "../actions/endpointActions";

import Endpoints from "../components/Endpoints";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps.endpoint,
        height: ownProps.height
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEndpoints: (cid, requestOptions) => dispatch(requestEndpoints(cid, requestOptions)),
        toggleStreaming: (cid, stream) => dispatch(toggleStreaming(cid, stream)),
        stopStream: () => dispatch(stopStream()),
        clearServerRendered: cid => dispatch(clearServerRendered(cid))
    }
};

const EndpointsContainer = connect(mapStateToProps, mapDispatchToProps)(Endpoints);
export default EndpointsContainer;
