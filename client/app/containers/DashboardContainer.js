import React from "react";
import {connect} from "react-redux";
import DashboardPage from "../components/dashboardPage";

const mapStateToProps = (state) => {
    var auditColumns = Object.keys(state.dashboard.audit.columns)
                        .filter(k => k !== "TimeSent")
                        .reduce((result, key) => {
                            result[key] = state.dashboard.audit.columns[key];
                            return result;
                        }, {});

    var errorColumns = Object.keys(state.dashboard.error.columns)
        .filter(k => k !== "TimeSent")
        .reduce((result, key) => {
            result[key] = state.dashboard.error.columns[key];
            return result;
        }, {});

    return {
        audit: {
            ...state.dashboard.audit,
            columns: auditColumns
        },
        error: {
            ...state.dashboard.error,
            columns: errorColumns
        },
        endpoint: state.dashboard.endpoint
    };
};

const DashboardPageContainer = connect(mapStateToProps)(DashboardPage);
export default DashboardPageContainer;
