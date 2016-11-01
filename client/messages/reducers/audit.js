import {REQUEST_AUDIT_MESSAGES,
    RECEIVE_AUDIT_MESSAGES,
    RECEIVE_NEW_AUDIT_MESSAGES,
    RECEIVE_AUDIT_MESSAGE_ERROR,
    TOGGLE_AUDIT_STREAM,
    SET_ACTIVE_SESSION,
    CLEAR_ACTIVE_SESSION,
    SET_ACTIVE_MESSAGE} from '../constants/actionTypes';

import {audit as auditState} from '../initialState';

import objectAssign from 'object-assign';

export default function audit (state = auditState(), action) {
    if(action.cid !== state.cid) {
        return state;
    }

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
            return objectAssign({}, state, {
                messages: messages,
                requesting: false
            });

        case RECEIVE_AUDIT_MESSAGE_ERROR:
            return objectAssign({}, state, {
                messages: [],
                requesting: false,
                error: action.error
            });

        case TOGGLE_AUDIT_STREAM:
            return  objectAssign({}, state, {
                requestOptions: {
                    ...state.requestOptions,
                    started: action.stream
                }
            });

        case SET_ACTIVE_SESSION:
            return {
                ...state,
                activeSession: action.messages
            };

        case CLEAR_ACTIVE_SESSION:
            return {
                ...state,
                activeSession: null
            };

        case SET_ACTIVE_MESSAGE:
            return {
                ...state,
                activeMessage: action.message
            };

        default:
            return state;
    }
}
