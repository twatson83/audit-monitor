import assert from 'assert';
import audit from '../../reducers/audit';
import {audit as getAuditState} from '../../initialState';
import {REQUEST_AUDIT_MESSAGES,
    RECEIVE_AUDIT_MESSAGES,
    RECEIVE_NEW_AUDIT_MESSAGES,
    RECEIVE_AUDIT_MESSAGE_ERROR,
    TOGGLE_AUDIT_STREAM,
    SET_ACTIVE_SESSION,
    CLEAR_ACTIVE_SESSION,
    SET_ACTIVE_MESSAGE} from '../../constants/actionTypes';

describe("Messages", () => {

    describe("Audit Reducers", () => {

        it("should not process action if cid's dont match", () => {
            let auditState = getAuditState();
            let state = audit(auditState, {});
            assert.equal(auditState, state);
        });

        describe("REQUEST_AUDIT_MESSAGES", () => {

            let action = {
                type: REQUEST_AUDIT_MESSAGES,
                requestOptions: {
                    test: "FakeRequestOptions"
                }
            };

            it("should set requesting to true", () => {
                let auditState = getAuditState();
                action.cid = auditState.cid;
                let state = audit(auditState, action);
                assert.equal(state.requesting, true);
            });

            it("should set requestOptions", () => {
                let auditState = getAuditState();
                action.cid = auditState.cid;
                let state = audit(auditState, action);
                assert.equal(state.requestOptions, action.requestOptions);
            });

        });

        describe("RECEIVE_AUDIT_MESSAGES", () => {

            let action;

            beforeEach(() => {
                action = {
                    type: RECEIVE_AUDIT_MESSAGES
                };
            });

            it("should set message instances", () => {
                action.instances = [];
                let auditState = getAuditState();
                action.cid = auditState.cid;
                let state = audit(auditState, action);
                assert.equal(state.messages, action.instances);
            });

            it("should set hasMorePages to false", () => {
                let auditState = getAuditState();
                action.cid = auditState.cid;
                let instances = [];
                for (let i = 0; i < auditState.requestOptions.pageSize; i++){
                    instances.push({});
                }
                action.instances = instances;
                let state = audit(auditState, action);
                assert.equal(state.requestOptions.hasMorePages, false);
            });

            it("should set hasMorePages to true", () => {
                let auditState = getAuditState();
                action.cid = auditState.cid;
                let instances = [];
                for (let i = 0; i < auditState.requestOptions.pageSize + 1; i++){
                    instances.push({});
                }
                action.instances = instances;
                let state = audit(auditState, action);
                assert.equal(state.requestOptions.hasMorePages, true);
            });

        });

        describe("RECEIVE_NEW_AUDIT_MESSAGES", () => {

            let action;

            beforeEach(() => {
                action = {
                    type: RECEIVE_NEW_AUDIT_MESSAGES
                };
            });

            it("should add messages to beginning of state messages array", () => {
                action.messages = [{ "id": 2}];
                let auditState = getAuditState();
                auditState.messages = [{ "id": 1}];
                action.cid = auditState.cid;
                let state = audit(auditState, action);
                assert.equal(state.messages[0].id, 2);
                assert.equal(state.messages[1].id, 1);
            });

            it("should maintain page size", () => {
                let auditState = getAuditState();
                action.cid = auditState.cid;
                for (let i = 0; i < auditState.requestOptions.pageSize; i++){
                    auditState.messages.push({
                        id: i
                    });
                }
                action.messages = [{ id: "test"}];
                let state = audit(auditState, action);
                assert.equal(state.messages.length, auditState.requestOptions.pageSize);
                assert.equal(state.messages[0].id, "test");
            });

            it("should set requesting to false", () => {
                let auditState = getAuditState();
                action.cid = auditState.cid;
                action.messages = [];
                let state = audit(auditState, action);
                assert.equal(state.requesting, false);
            });

        });

        describe("RECEIVE_AUDIT_MESSAGE_ERROR", () => {

            let action;

            beforeEach(() => {
                action = {
                    type: RECEIVE_AUDIT_MESSAGE_ERROR,
                    error: "Test Error"
                };
            });

            it("should empty messages array", () => {
                let auditState = getAuditState();
                action.cid = auditState.cid;
                let state = audit(auditState, action);
                assert.equal(state.messages.length, 0);
            });

            it("should set requesting to false", () => {
                let auditState = getAuditState();
                action.cid = auditState.cid;
                let state = audit(auditState, action);
                assert.equal(state.requesting, false);
            });

            it("should add error to state", () => {
                let auditState = getAuditState();
                action.cid = auditState.cid;
                let state = audit(auditState, action);
                assert.equal(state.error, "Test Error");
            });
        });

        describe("TOGGLE_AUDIT_STREAM", () => {

            let action;

            beforeEach(() => {
                action = {
                    type: TOGGLE_AUDIT_STREAM,
                    stream: false
                };
            });

            it("should set started to false", () => {
                let auditState = getAuditState();
                auditState.requestOptions.started = true;
                action.cid = auditState.cid;
                let state = audit(auditState, action);
                assert.equal(state.requestOptions.started, false);
            });

            it("should set started to true", () => {
                let auditState = getAuditState();
                auditState.requestOptions.started = false;
                action.cid = auditState.cid;
                action.stream = true;
                let state = audit(auditState, action);
                assert.equal(state.requestOptions.started, true);
            });

        });

        describe("SET_ACTIVE_SESSION", () => {

            let action;

            beforeEach(() => {
                action = {
                    type: SET_ACTIVE_SESSION,
                    messages: []
                };
            });

            it("should set active session messages", () => {
                let auditState = getAuditState();
                action.cid = auditState.cid;
                let state = audit(auditState, action);
                assert.equal(state.activeSession, action.messages);
            });

        });

        describe("CLEAR_ACTIVE_SESSION", () => {

            let action;

            beforeEach(() => {
                action = {
                    type: CLEAR_ACTIVE_SESSION
                };
            });

            it("should set active session messages to null", () => {
                let auditState = getAuditState();
                action.cid = auditState.cid;
                let state = audit(auditState, action);
                assert.equal(state.activeSession, null);
            });

        });

        describe("SET_ACTIVE_MESSAGE", () => {

            let action;

            beforeEach(() => {
                action = {
                    type: SET_ACTIVE_MESSAGE,
                    message: {}
                };
            });

            it("should set active message", () => {
                let auditState = getAuditState();
                action.cid = auditState.cid;
                let state = audit(auditState, action);
                assert.equal(state.activeMessage, action.message);
            });

        });
    });

});