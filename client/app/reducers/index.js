import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import audit from '../../messages/reducers/audit';
import error from '../../errors/reducers/errors';
import endpoint from '../../endpoints/reducers/endpoints';

const rootReducer = combineReducers({
    audit,
    error,
    endpoint,
    dashboard: combineReducers({
        audit,
        error,
        endpoint,
    }),
    routing: routerReducer
});

export default rootReducer;
