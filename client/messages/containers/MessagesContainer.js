import React from "react";
import {connect} from "react-redux";

import { requestAuditMessages, toggleStreaming, stopStream,
         setActiveMessage, getSession, clearSession } from "../actions/auditActions";

import Messages from "../components/Messages";

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps.audit,
        height: ownProps.height
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMessages: (cid, requestOptions) => dispatch(requestAuditMessages(cid, requestOptions)),
        toggleStreaming: (cid, stream) => dispatch(toggleStreaming(cid, stream)),
        stopStream: () => dispatch(stopStream()),
        setActiveMessage: (cid, m) => dispatch(setActiveMessage(cid, m)),
        getSession: (cid, sessionId) => dispatch(getSession(cid, sessionId)),
        clearSession: (cid, sessionId) => dispatch(clearSession(cid, sessionId))
    }
};

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);
export default MessagesContainer;
