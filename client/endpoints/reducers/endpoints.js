import {REQUEST_ENDPOINTS,
    RECEIVE_ENDPOINTS,
    RECEIVE_ENDPOINTS_ERROR,
    TOGGLE_HEARTBEAT_STREAM,
    RECEIVE_HEARTBEATS,
    RECEIVE_ENDPOINT,
    CLEAR_SERVER_RENDERED} from '../constants/actionTypes';

import {endpoint as endpointState} from '../initialState';

import objectAssign from 'object-assign';

export default function errors (state = endpointState(), action) {
    if(action.cid !== state.cid) {
        return state;
    }

    switch (action.type) {

        case REQUEST_ENDPOINTS:
            return objectAssign({}, state, {
                requesting: true,
                requestOptions: action.requestOptions
            });

        case RECEIVE_ENDPOINTS:
            let endpoints = {};
            action.instances.forEach(i => {
                endpoints[i.Name] = i
            });

            return objectAssign({}, state, {
               endpoints: endpoints,
               requesting: false
            });

        case RECEIVE_HEARTBEATS:

            let heartbeats = {};
            action.heartbeats.forEach(h => {
                heartbeats[h.Name] = h
            });

            return objectAssign({}, state, {
                endpoints: {
                    ...state.endpoints,
                    ...heartbeats
                },
                requesting: false
            });

            return null;

        case RECEIVE_ENDPOINTS_ERROR:
            return objectAssign({}, state, {
                endpoints: {},
                requesting: false,
                error: action.error
            });

        case TOGGLE_HEARTBEAT_STREAM:
            return  objectAssign({}, state, {
                requestOptions: {
                    ...state.requestOptions,
                    started: action.stream
                }
            });

        case RECEIVE_ENDPOINT:
            return {
                ...state,
                endpoints: {
                    ...state.endpoints,
                    [action.endpoint.Name]: action.endpoint
                }
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
