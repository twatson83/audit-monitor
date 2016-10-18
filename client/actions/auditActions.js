import {REQUEST_AUDIT_MESSAGES,
        RECEIVE_AUDIT_MESSAGES,
        RECEIVE_NEW_AUDIT_MESSAGES,
        RECEIVE_AUDIT_MESSAGE_ERROR} from '../constants/actionTypes';

import { addHandler } from "service-connect-hub/lib/client";

export function requestAuditMessages(requestOptions) {
    return function(dispatch){
        addHandler("NewAuditMessages", event => dispatch(receiveNewAuditMessages(event.messages)));

        dispatch({ type: REQUEST_AUDIT_MESSAGES, requestOptions });

        var params = { ...requestOptions };
        var query = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k] || ""))
            .join('&');

        fetch("/messages?" + query)
            .then(response => response.json())
            .then(instances => dispatch({ type: RECEIVE_AUDIT_MESSAGES, instances}))
            .catch(error => dispatch({ type: RECEIVE_AUDIT_MESSAGE_ERROR, error}));
    };
}

export function receiveNewAuditMessages(messages) {
    return { type: RECEIVE_NEW_AUDIT_MESSAGES, messages };
}