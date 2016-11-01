import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import DashboardContainer from './containers/DashboardContainer';
import MessagesPageContainer from './containers/MessagesPageContainer';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={DashboardContainer}/>
        <Route path="messages" component={MessagesPageContainer}/>
    </Route>
);
