import React from 'react';
import {render} from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import routes from "./routes";
import configureStore from "./store";
import { syncHistoryWithStore } from "react-router-redux";
import { connect } from "service-connect-hub/lib/client";
import "font-awesome/scss/font-awesome.scss";
import "./style/base.scss";

connect().then(() => {
    const store = configureStore();

    const history = syncHistoryWithStore(browserHistory, store);

    render(
        <Provider store={store}>
            <Router history={history} routes={routes} />
        </Provider>, document.getElementById("app")
    );
});

