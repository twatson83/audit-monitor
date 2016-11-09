import {REQUEST_ENDPOINTS,
    RECEIVE_ENDPOINTS,
    RECEIVE_ENDPOINTS_ERROR,
    TOGGLE_HEARTBEAT_STREAM,
    RECEIVE_HEARTBEATS,
    RECEIVE_ENDPOINT,
    CLEAR_SERVER_RENDERED} from '../constants/actionTypes';

import { addHandler, removeHandler } from "service-connect-hub/lib/client";
import "isomorphic-fetch";

let newHeartbeatCallback, newEndpointCallback;

export function requestEndpoints(cid, requestOptions) {
    return function(dispatch){
        dispatch({ type: REQUEST_ENDPOINTS, requestOptions, cid });

        var params = { ...requestOptions };
        var query = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k] || ""))
            .join('&');

        fetch("/api/endpoints?" + query)
            .then(response => response.json())
            .then(instances => dispatch({ type: RECEIVE_ENDPOINTS, instances, cid}))
            .catch(error => dispatch({ type: RECEIVE_ENDPOINTS_ERROR, error, cid}));
    };
}

export function stopStream(){
    return function() {
        if (newHeartbeatCallback){
            removeHandler("NewHeartbeatMessages", newHeartbeatCallback);
            newHeartbeatCallback = null;
        }
        if (newEndpointCallback){
            removeHandler("NewEndpoint", newEndpointCallback);
            newEndpointCallback = null;
        }
    }
}

export function toggleStreaming(cid, stream) {
    return function(dispatch){

        if (stream) {
            if (!newHeartbeatCallback) {
                newHeartbeatCallback = event => dispatch(receiveHeartbeats(cid, event.heartbeats));
                addHandler("NewHeartbeatMessages", newHeartbeatCallback);
            }
            if (!newEndpointCallback){
                newEndpointCallback = event => dispatch(receiveEndpoint(cid, event));
                addHandler("NewEndpoint", newEndpointCallback);
            }
        } else {
            if (newHeartbeatCallback){
                removeHandler("NewHeartbeatMessages", newHeartbeatCallback);
                newHeartbeatCallback = null;
            }
            if (newEndpointCallback){
                removeHandler("NewEndpoint", newEndpointCallback);
                newEndpointCallback = null;
            }
        }

        dispatch({ type: TOGGLE_HEARTBEAT_STREAM, stream, cid });
    };
}

export function receiveHeartbeats(cid, heartbeats) {
    return { type: RECEIVE_HEARTBEATS, heartbeats, cid };
}

export function receiveEndpoint(cid, endpoint) {
    return { type: RECEIVE_ENDPOINT, endpoint, cid };
}

export function clearServerRendered(cid){
    return { type: CLEAR_SERVER_RENDERED, cid };
}