import React from "react";
import {connect} from "react-redux";

import ErrorsPage from "../components/ErrorsPage";

const mapStateToProps = (state) => {

    return {
        error: state.error
    };
};

const ErrorsPageContainer = connect(mapStateToProps)(ErrorsPage);
export default ErrorsPageContainer;
