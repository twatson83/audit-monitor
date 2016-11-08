import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import DashboardContainer from './containers/DashboardContainer';
import MessagesPageContainer from './containers/MessagesPageContainer';
import ErrorsPageContainer from './containers/ErrorsPageContainer';
import EndpointsPageContainer from './containers/EndpointsPageContainer';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={DashboardContainer}/>
        <Route path="audit" component={MessagesPageContainer}/>
        <Route path="errors" component={ErrorsPageContainer}/>
        <Route path="endpoints" component={EndpointsPageContainer}/>
    </Route>
);
