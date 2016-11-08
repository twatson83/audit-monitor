import React from "react";
import {connect} from "react-redux";

import EndpointsPage from "../components/EndpointsPage";

const mapStateToProps = (state) => {

    return {
        endpoint: state.endpoint
    };
};

const EndpointsPageContainer = connect(mapStateToProps)(EndpointsPage);
export default EndpointsPageContainer;
