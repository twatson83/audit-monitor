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

describe("Messages", function() {

    describe("Audit Reducers", function(){

        it("should not process action if cid's dont match", function(){
            var auditState = getAuditState();
            var state = audit(auditState, {});
            assert.equal(auditState, state);
        });

        describe("REQUEST_AUDIT_MESSAGES", function(){

            var action = {
                type: REQUEST_AUDIT_MESSAGES,
                requestOptions: {
                    test: "FakeRequestOptions"
                }
            };

            it("should set requesting to true", function(){
                var auditState = getAuditState();
                action.cid = auditState.cid;
                var state = audit(auditState, action);
                assert.equal(state.requesting, true);
            });

            it("should set requestOptions", function(){
                var auditState = getAuditState();
                action.cid = auditState.cid;
                var state = audit(auditState, action);
                assert.equal(state.requestOptions, action.requestOptions);
            });

        });

        describe("RECEIVE_AUDIT_MESSAGES", function(){

            var action;

            beforeEach(function(){
                action = {
                    type: RECEIVE_AUDIT_MESSAGES
                };
            });

            it("should set message instances", function(){
                action.instances = [];
                var auditState = getAuditState();
                action.cid = auditState.cid;
                var state = audit(auditState, action);
                assert.equal(state.messages, action.instances);
            });

            it("should set hasMorePages to false", function(){
                var auditState = getAuditState();
                action.cid = auditState.cid;
                var instances = [];
                for (var i = 0; i < auditState.requestOptions.pageSize; i++){
                    instances.push({});
                }
                action.instances = instances;
                var state = audit(auditState, action);
                assert.equal(state.requestOptions.hasMorePages, false);
            });

            it("should set hasMorePages to true", function(){
                var auditState = getAuditState();
                action.cid = auditState.cid;
                var instances = [];
                for (var i = 0; i < auditState.requestOptions.pageSize + 1; i++){
                    instances.push({});
                }
                action.instances = instances;
                var state = audit(auditState, action);
                assert.equal(state.requestOptions.hasMorePages, true);
            });

        });

        describe("RECEIVE_NEW_AUDIT_MESSAGES", function(){

            var action;

            beforeEach(function(){
                action = {
                    type: RECEIVE_NEW_AUDIT_MESSAGES
                };
            });

            it("should add messages to beginning of state messages array", function(){
                action.messages = [{ "id": 2}];
                var auditState = getAuditState();
                auditState.messages = [{ "id": 1}];
                action.cid = auditState.cid;
                var state = audit(auditState, action);
                assert.equal(state.messages[0].id, 2);
                assert.equal(state.messages[1].id, 1);
            });

            it("should maintain page size", function(){
                var auditState = getAuditState();
                action.cid = auditState.cid;
                for (var i = 0; i < auditState.requestOptions.pageSize; i++){
                    auditState.messages.push({
                        id: i
                    });
                }
                action.messages = [{ id: "test"}];
                var state = audit(auditState, action);
                assert.equal(state.messages.length, auditState.requestOptions.pageSize);
                assert.equal(state.messages[0].id, "test");
            });

            it("should set requesting to false", function(){
                var auditState = getAuditState();
                action.cid = auditState.cid;
                action.messages = [];
                var state = audit(auditState, action);
                assert.equal(state.requesting, false);
            });

        });

        describe("RECEIVE_AUDIT_MESSAGE_ERROR", function(){

            var action;

            beforeEach(function(){
                action = {
                    type: RECEIVE_AUDIT_MESSAGE_ERROR,
                    error: "Test Error"
                };
            });

            it("should empty messages array", function(){
                var auditState = getAuditState();
                action.cid = auditState.cid;
                var state = audit(auditState, action);
                assert.equal(state.messages.length, 0);
            });

            it("should set requesting to false", function(){
                var auditState = getAuditState();
                action.cid = auditState.cid;
                var state = audit(auditState, action);
                assert.equal(state.requesting, false);
            });

            it("should add error to state", function(){
                var auditState = getAuditState();
                action.cid = auditState.cid;
                var state = audit(auditState, action);
                assert.equal(state.error, "Test Error");
            });
        });

        describe("TOGGLE_AUDIT_STREAM", function(){

            var action;

            beforeEach(function(){
                action = {
                    type: TOGGLE_AUDIT_STREAM,
                    stream: false
                };
            });

            it("should set started to false", function(){
                var auditState = getAuditState();
                auditState.requestOptions.started = true;
                action.cid = auditState.cid;
                var state = audit(auditState, action);
                assert.equal(state.requestOptions.started, false);
            });

            it("should set started to true", function(){
                var auditState = getAuditState();
                auditState.requestOptions.started = false;
                action.cid = auditState.cid;
                action.stream = true;
                var state = audit(auditState, action);
                assert.equal(state.requestOptions.started, true);
            });

        });

        describe("SET_ACTIVE_SESSION", function(){

            var action;

            beforeEach(function(){
                action = {
                    type: SET_ACTIVE_SESSION,
                    messages: []
                };
            });

            it("should set active session messages", function(){
                var auditState = getAuditState();
                action.cid = auditState.cid;
                var state = audit(auditState, action);
                assert.equal(state.activeSession, action.messages);
            });

        });

        describe("CLEAR_ACTIVE_SESSION", function(){

            var action;

            beforeEach(function(){
                action = {
                    type: CLEAR_ACTIVE_SESSION
                };
            });

            it("should set active session messages to null", function(){
                var auditState = getAuditState();
                action.cid = auditState.cid;
                var state = audit(auditState, action);
                assert.equal(state.activeSession, null);
            });

        });

        describe("SET_ACTIVE_MESSAGE", function(){

            var action;

            beforeEach(function(){
                action = {
                    type: SET_ACTIVE_MESSAGE,
                    message: {}
                };
            });

            it("should set active message", function(){
                var auditState = getAuditState();
                action.cid = auditState.cid;
                var state = audit(auditState, action);
                assert.equal(state.activeMessage, action.message);
            });

        });
    });

});