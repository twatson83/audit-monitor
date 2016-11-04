import express from 'express';
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import MessagesPageContainer from '../../client/app/containers/MessagesPageContainer';
import DashboardContainer from '../../client/app/containers/DashboardContainer';
import App from '../../client/app/components/App';
import { renderToString } from 'react-dom/server';
import rootReducer from "../../client/app/reducers";

const router = express.Router();

const page = (html, preloadedState) => {
    return `
    <!doctype html>
    <html>
      <head>
          <title></title>
          <meta charset="utf8"/>
          <link rel="stylesheet" href="/static/style.css">
      </head>
      <body>
        <div id="app"><div>${html}</div></div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>     
        <script src="/static/bundle.js"></script>   
      </body>
    </html>
    `
};

const handleRender = (req, res, Component) => {
    const store = createStore(rootReducer);
    const html = renderToString(
        <Provider store={store}>
            <App>
                <Component/>
            </App>
        </Provider>
    );
    const preloadedState = store.getState();
    res.send(page(html, preloadedState))
};

router.get('/audit', (req, res) => handleRender(req, res, MessagesPageContainer));
router.get('/dashboard', (req, res) => handleRender(req, res, DashboardContainer));
router.get('', (req, res) => handleRender(req, res, DashboardContainer));

module.exports = router;