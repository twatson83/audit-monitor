import React from "react";
import {connect} from "react-redux";

import { requestErrorMessages, toggleStreaming, stopStream,
         setActiveError } from "../actions/errorActions";

import Errors from "../components/Errors";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps.error,
        height: ownProps.height
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchErrors: (cid, requestOptions) => dispatch(requestErrorMessages(cid, requestOptions)),
        toggleStreaming: (cid, stream) => dispatch(toggleStreaming(cid, stream)),
        stopStream: () => dispatch(stopStream()),
        setActiveError: (cid, m) => dispatch(setActiveError(cid, m))
    }
};

const ErrorsContainer = connect(mapStateToProps, mapDispatchToProps)(Errors);
export default ErrorsContainer;
