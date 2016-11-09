import {REQUEST_AUDIT_MESSAGES,
        RECEIVE_AUDIT_MESSAGES,
        RECEIVE_NEW_AUDIT_MESSAGES,
        RECEIVE_AUDIT_MESSAGE_ERROR,
        TOGGLE_AUDIT_STREAM,
        SET_ACTIVE_MESSAGE,
        SET_ACTIVE_SESSION,
        CLEAR_ACTIVE_SESSION,
        CLEAR_SERVER_RENDERED} from '../constants/actionTypes';

import { addHandler, removeHandler } from "service-connect-hub/lib/client";
import "isomorphic-fetch";

let newAuditMessagesCallback;

export function requestAuditMessages(cid, requestOptions) {
    return function(dispatch){
        dispatch({ type: REQUEST_AUDIT_MESSAGES, requestOptions, cid });

        var params = { ...requestOptions };
        var query = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k] || ""))
            .join('&');

        fetch("/api/messages?" + query)
            .then(response => response.json())
            .then(instances => dispatch({ type: RECEIVE_AUDIT_MESSAGES, instances, cid}))
            .catch(error => dispatch({ type: RECEIVE_AUDIT_MESSAGE_ERROR, error, cid}));
    };
}

export function stopStream(){
    return function() {
        if (newAuditMessagesCallback){
            removeHandler("NewAuditMessages", newAuditMessagesCallback);
            newAuditMessagesCallback = null;
        }
    }
}

export function toggleStreaming(cid, stream) {
    return function(dispatch){

        if (stream) {
            if (!newAuditMessagesCallback) {
                newAuditMessagesCallback = event => dispatch(receiveNewAuditMessages(cid, event.messages));
                addHandler("NewAuditMessages", newAuditMessagesCallback);
            }
        } else {
            if (newAuditMessagesCallback){
                removeHandler("NewAuditMessages", newAuditMessagesCallback);
                newAuditMessagesCallback = null;
            }
        }

        dispatch({ type: TOGGLE_AUDIT_STREAM, stream, cid });
    };
}

export function receiveNewAuditMessages(cid, messages) {
    return { type: RECEIVE_NEW_AUDIT_MESSAGES, messages, cid };
}

export function setActiveMessage(cid, message){
    return { type: SET_ACTIVE_MESSAGE, message, cid };
}

export function getSession(cid, sessionId){
    return function(dispatch) {
        fetch("/api/session/" + encodeURIComponent(sessionId))
            .then(response => response.json())
            .then(messages => dispatch({ type: SET_ACTIVE_SESSION, messages, cid}))
            .catch(error => console.log);
    }
}

export function clearSession(cid){
    return { type: CLEAR_ACTIVE_SESSION, cid };
}

export function clearServerRendered(cid){
    return { type: CLEAR_SERVER_RENDERED, cid };
}