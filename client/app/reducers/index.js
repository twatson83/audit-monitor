import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import audit from '../../messages/reducers/audit';
import error from '../../errors/reducers/errors';

const rootReducer = combineReducers({
    audit,
    error,
    dashboard: combineReducers({
        audit,
        error
    }),
    routing: routerReducer
});

export default rootReducer;
