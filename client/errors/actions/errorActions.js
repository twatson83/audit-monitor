import {REQUEST_ERROR_MESSAGES,
        RECEIVE_ERROR_MESSAGES,
        RECEIVE_NEW_ERROR_MESSAGES,
        RECEIVE_ERROR_MESSAGE_ERROR,
        TOGGLE_ERROR_STREAM,
        SET_ACTIVE_ERROR_MESSAGE,
        CLEAR_SERVER_RENDERED} from '../constants/actionTypes';

import { addHandler, removeHandler } from "service-connect-hub/lib/client";
import "isomorphic-fetch"

let newErrorMessagesCallback;

export function requestErrorMessages(cid, requestOptions) {
    return function(dispatch){
        dispatch({ type: REQUEST_ERROR_MESSAGES, requestOptions, cid });

        var params = { ...requestOptions };
        var query = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k] || ""))
            .join('&');

        fetch("/api/errors?" + query)
            .then(response => response.json())
            .then(instances => dispatch({ type: RECEIVE_ERROR_MESSAGES, instances, cid}))
            .catch(error => dispatch({ type: RECEIVE_ERROR_MESSAGE_ERROR, error, cid}));
    };
}

export function stopStream(){
    return function() {
        if (newErrorMessagesCallback){
            removeHandler("NewErrorMessages", newErrorMessagesCallback);
            newErrorMessagesCallback = null;
        }
    }
}

export function toggleStreaming(cid, stream) {
    return function(dispatch){

        if (stream) {
            if (!newErrorMessagesCallback) {
                newErrorMessagesCallback = event => dispatch(receiveNewErrorMessages(cid, event.messages));
                addHandler("NewErrorMessages", newErrorMessagesCallback);
            }
        } else {
            if (newErrorMessagesCallback){
                removeHandler("NewErrorMessages", newErrorMessagesCallback);
                newErrorMessagesCallback = null;
            }
        }

        dispatch({ type: TOGGLE_ERROR_STREAM, stream, cid });
    };
}

export function receiveNewErrorMessages(cid, messages) {
    return { type: RECEIVE_NEW_ERROR_MESSAGES, messages, cid };
}

export function setActiveError(cid, message){
    return { type: SET_ACTIVE_ERROR_MESSAGE, message, cid };
}

export function clearServerRendered(cid){
    return { type: CLEAR_SERVER_RENDERED, cid };
}