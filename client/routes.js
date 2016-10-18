import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePageContainer from './containers/HomePage';

export default (
<Route path="/" component={App}>
    <IndexRoute component={HomePageContainer}/>
    </Route>
);
