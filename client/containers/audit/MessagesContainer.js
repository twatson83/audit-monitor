import React from "react";
import {connect} from "react-redux";
import Messages from "../../components/audit/Messages";

const mapStateToProps = (state) => {
    return {
        messages: state.audit.messages,
        requesting: state.audit.requesting
    };
};

const MessagesContainer = connect(mapStateToProps)(Messages);
export default MessagesContainer;
