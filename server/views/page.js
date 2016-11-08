import React from 'react'
import { Provider } from 'react-redux'
import App from '../../client/app/components/App';
import { renderToString } from 'react-dom/server';

export const page = (html, preloadedState) => {
    return `
    <!doctype html>
    <html>
      <head>
          <title></title>
          <meta charset="utf8"/>
          <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <div id="app"><div>${html}</div></div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>     
        <script src="/bundle.js"></script>   
      </body>
    </html>
    `
};

export const handleRender = (req, res, Component, state, store) => {
    const html = renderToString(
        <Provider store={store}>
            <App>
                <Component/>
            </App>
        </Provider>
    );
    res.send(page(html, state))
};