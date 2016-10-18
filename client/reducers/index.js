import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import audit from './audit';
import page from './page';

const rootReducer = combineReducers({
    audit,
    page,
    routing: routerReducer
});

export default rootReducer;
