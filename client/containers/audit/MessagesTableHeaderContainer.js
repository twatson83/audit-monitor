import React from "react";
import {connect} from "react-redux";
import { requestAuditMessages } from "../../actions/auditActions";
import MessagesTableHeader from "../../components/audit/MessagesTableHeader";

const mapStateToProps = (state) => {
    return {
        requestOptions: state.audit.requestOptions,
        columns: state.audit.columns
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMessages: (page, pageSize, start, end) => dispatch(requestAuditMessages(page, pageSize, start, end))
    }
};

const MessagesTableHeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps)
(MessagesTableHeader);
export default MessagesTableHeaderContainer;
