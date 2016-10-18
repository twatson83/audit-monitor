import React from "react";
import {connect} from "react-redux";
import { requestAuditMessages } from "../../actions/auditActions";
import MessagesSearch from "../../components/audit/MessagesSearch";

const mapStateToProps = (state) => {
    return {
        requestOptions: state.audit.requestOptions
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
(MessagesSearch);
export default MessagesTableHeaderContainer;
