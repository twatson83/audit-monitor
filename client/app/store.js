import {createStore, compose, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createLogger from 'redux-logger';
import rootReducer from "./reducers";
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {

    let middlewares = [
        thunkMiddleware
    ];

    if (process.env.NODE_ENV !== "production") {
        middlewares.push(reduxImmutableStateInvariant());
        middlewares.push(createLogger());
    }

    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middlewares),
        window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers/index').default;
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
