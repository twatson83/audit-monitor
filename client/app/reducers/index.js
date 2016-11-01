import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import audit from '../../messages/reducers/audit';

const rootReducer = combineReducers({
    audit,
    dashboard: combineReducers({
        audit
    }),
    routing: routerReducer
});

export default rootReducer;
