import {REQUEST_ERROR_MESSAGES,
    RECEIVE_ERROR_MESSAGES,
    RECEIVE_NEW_ERROR_MESSAGES,
    RECEIVE_ERROR_MESSAGE_ERROR,
    TOGGLE_ERROR_STREAM,
    SET_ACTIVE_ERROR_MESSAGE,
    CLEAR_SERVER_RENDERED} from '../constants/actionTypes';

import {error as errorState} from '../initialState';

import objectAssign from 'object-assign';

export default function errors (state = errorState(), action) {
    if(action.cid !== state.cid) {
        return state;
    }

    switch (action.type) {

        case REQUEST_ERROR_MESSAGES:
            return objectAssign({}, state, {
                requesting: true,
                requestOptions: action.requestOptions
            });

        case RECEIVE_ERROR_MESSAGES:
            var hasMorePages =  action.instances.length > state.requestOptions.pageSize;
            action.instances.pop();
            return objectAssign({}, state, {
                errors: action.instances,
                requesting: false,
                requestOptions: {
                    ...state.requestOptions,
                    hasMorePages
                }
            });

        case RECEIVE_NEW_ERROR_MESSAGES:
            var messages = [
                ...action.messages,
                ...state.errors
            ];
            var overflow = messages.length - state.requestOptions.pageSize;
            if (overflow > 0){
                for(var i = 0; i < overflow; i++){
                    messages.pop();
                }
            }
            return objectAssign({}, state, {
                errors: messages,
                requesting: false
            });

        case RECEIVE_ERROR_MESSAGE_ERROR:
            return objectAssign({}, state, {
                errors: [],
                requesting: false,
                error: action.error
            });

        case TOGGLE_ERROR_STREAM:
            return  objectAssign({}, state, {
                requestOptions: {
                    ...state.requestOptions,
                    started: action.stream
                }
            });

        case SET_ACTIVE_ERROR_MESSAGE:
            return {
                ...state,
                activeMessage: action.message
            };

        case CLEAR_SERVER_RENDERED:
            return {
                ...state,
                requestOptions: {
                    ...state.requestOptions,
                    serverRendered: false
                }
            };

        default:
            return state;
    }
}
