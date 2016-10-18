import {REQUEST_AUDIT_MESSAGES,
    RECEIVE_AUDIT_MESSAGES,
    RECEIVE_NEW_AUDIT_MESSAGES,
    RECEIVE_AUDIT_MESSAGE_ERROR} from '../constants/actionTypes';

import initialState from '../initialState';
import objectAssign from 'object-assign';

export default function audit (state = initialState.audit, action) {
    switch (action.type) {

        case REQUEST_AUDIT_MESSAGES:
            return objectAssign({}, state, {
                requesting: true,
                requestOptions: action.requestOptions
            });

        case RECEIVE_AUDIT_MESSAGES:
            var hasMorePages =  action.instances.length > state.requestOptions.pageSize;
            action.instances.pop();
            return objectAssign({}, state, {
                messages: action.instances,
                requesting: false,
                requestOptions: {
                    ...state.requestOptions,
                    hasMorePages
                }
            });

        case RECEIVE_NEW_AUDIT_MESSAGES:
            var messages = [
                ...action.messages,
                ...state.messages
            ];
            var overflow = messages.length - state.requestOptions.pageSize;
            if (overflow > 0){
                for(var i = 0; i < overflow; i++){
                    messages.pop();
                }
            }
            return  objectAssign({}, state, {
                messages: messages,
                requesting: false
            });

        case RECEIVE_AUDIT_MESSAGE_ERROR:
            return  objectAssign({}, state, {
                messages: [],
                requesting: false,
                error: action.error
            });

        default:
            return state;
    }
}
