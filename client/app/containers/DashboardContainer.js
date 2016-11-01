import React from "react";
import {connect} from "react-redux";
import DashboardPage from "../components/dashboardPage";

const mapStateToProps = (state) => {
    var columns = Object.keys(state.dashboard.audit.columns)
                        .filter(k => k !== "TimeSent")
                        .reduce((result, key) => {
                            result[key] = state.dashboard.audit.columns[key];
                            return result;
                        }, {});

    return {
        audit: {
            ...state.dashboard.audit,
            columns
        }
    };
};

const DashboardPageContainer = connect(mapStateToProps)(DashboardPage);
export default DashboardPageContainer;
