import React from "react";
import {connect} from "react-redux";
import { setPage } from "../actions/pageActions";
import HomePage from "../components/HomePage";

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPage: () => dispatch(setPage("Home"))
    }
};

const HomePageContainer = connect(
    mapStateToProps,
    mapDispatchToProps)
(HomePage);
export default HomePageContainer;
