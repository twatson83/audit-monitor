import React from 'react';
import {expect} from 'chai';
import Messages from '../../components/Messages';
import { shallow, mount } from 'enzyme';
import { audit }  from '../../initialState';
import MessagesHeader from '../../components/MessagesHeader';
import MessagesTable from '../../components/MessagesTable';
import Panel from '../../../panel/components';

describe("components", () => {

    let state, functions, props,
        fetchMessagesArgs, toggleStreamingArgs, clearServerRenderedArgs;

    beforeEach(() => {
        fetchMessagesArgs = null;
        toggleStreamingArgs = null;
        clearServerRenderedArgs = null;

        state = audit();
        functions = {
            fetchMessages: (...args) => {
                fetchMessagesArgs = args;
            },
            toggleStreaming: (...args) => {
                toggleStreamingArgs = args;
            },
            stopStream: () => {},
            setActiveMessage: () => {},
            getSession: () => {},
            clearSession: () => {},
            clearServerRendered: (...args) => {
                clearServerRenderedArgs = args;
            }
        };
        props = {
            ...state,
            ...functions
        };
    });

    describe("<Messages />", () => {
        it("should start streaming if started is true", function(){
            state.requestOptions.started = true;
            mount(<Messages {...props} />);
            expect(toggleStreamingArgs).to.exist;
            expect(toggleStreamingArgs[0]).to.equal(state.cid);
            expect(toggleStreamingArgs[1]).to.equal(true);
        });

        it("should not start streaming if started is false", function(){
            state.requestOptions.started = false;
            mount(<Messages {...props} />);
            expect(toggleStreamingArgs).to.exist;
            expect(toggleStreamingArgs[0]).to.equal(state.cid);
            expect(toggleStreamingArgs[1]).to.equal(false);
        });

        it("should fetch messages if the component wasnt rendered on the server", function(){
            mount(<Messages {...props} />);
            expect(fetchMessagesArgs).to.exist;
            expect(fetchMessagesArgs[0]).to.equal(state.cid);
            expect(fetchMessagesArgs[1]).to.equal(state.requestOptions);
        });

        it("should not fetch messages if the component was rendered on the server", function(){
            state.requestOptions.serverRendered = true;
            mount(<Messages {...props} />);
            expect(fetchMessagesArgs).to.not.exist;
        });

        it("should clearServerRendered flag if the component was rendered on the server", function(){
            state.requestOptions.serverRendered = true;
            mount(<Messages {...props} />);
            expect(clearServerRenderedArgs).to.exist;
            expect(clearServerRenderedArgs[0]).to.equal(state.cid);
        });

        it("should not clearServerRendered flag if the component was not rendered on the server", function(){
            state.requestOptions.serverRendered = false;
            mount(<Messages {...props} />);
            expect(clearServerRenderedArgs).to.not.exist;
        });

        it("should render a panel", () => {
            const wrapper = shallow(<Messages {...props} />);
            expect(wrapper.find(Panel)).to.have.lengthOf(1);
        });

        it("should pass <MessagesHeader /> to Panel", () => {
            state.messages.push({ id: 1}, {id: 2});
            const wrapper = shallow(<Messages {...props} />);
            let panel = wrapper.find(Panel),
                heading = panel.props().heading;

            expect(heading.type === MessagesHeader).to.exist;
            expect(heading.props.cid).to.equal(state.cid);
            expect(heading.props.fetchMessages).to.equal(functions.fetchMessages);
            expect(heading.props.requestOptions).to.equal(state.requestOptions);
            expect(heading.props.requesting).to.equal(state.requesting);
            expect(heading.props.toggleStreaming).to.equal(functions.toggleStreaming);
        });

        it("should pass <MessagesTable /> to Panel", () => {
            state.messages.push({ id: 1}, {id: 2});
            const wrapper = shallow(<Messages {...props} />);
            let panel = wrapper.find(Panel),
                body = panel.props().body;

            expect(body.type === MessagesTable).to.exist;
            expect(body.props.cid).to.equal(state.cid);
            expect(body.props.fetchMessages).to.equal(functions.fetchMessages);
            expect(body.props.columns).to.equal(state.columns);
            expect(body.props.requestOptions).to.equal(state.requestOptions);
            expect(body.props.fetchMessages).to.equal(functions.fetchMessages);
            expect(body.props.getSession).to.equal(functions.getSession);
            expect(body.props.setActiveMessage).to.equal(functions.setActiveMessage);
            expect(body.props.messages).to.equal(state.messages);
            expect(body.props.requesting).to.equal(state.requesting);
        });
    });
});
