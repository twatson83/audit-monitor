import React from "react";
import {connect} from "react-redux";
import { requestAuditMessages } from "../../actions/auditActions";
import MessagesFooter from "../../components/audit/MessagesFooter";

const mapStateToProps = (state) => {
    return { requestOptions: state.audit.requestOptions };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMessages: (page, pageSize, start, end) => dispatch(requestAuditMessages(page, pageSize, start, end))
    }
};

const MessagesFooterContainer = connect(
    mapStateToProps,
    mapDispatchToProps)
(MessagesFooter);
export default MessagesFooterContainer;
