import React from "react";
import {connect} from "react-redux";

import MessagesPage from "../components/MessagesPage";

const mapStateToProps = (state) => {
    return {
        audit: state.audit
    };
};

const MessagesPageContainer = connect(mapStateToProps)(MessagesPage);
export default MessagesPageContainer;
