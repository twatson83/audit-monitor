import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createLogger from 'redux-logger';
import rootReducer from "./reducers";
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {

    const middlewares = [
        createSagaMiddleware(),
        reduxImmutableStateInvariant(),
        createLogger(),
        thunkMiddleware
    ];

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
