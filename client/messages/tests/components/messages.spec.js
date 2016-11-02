import React from 'react';
import {expect} from 'chai';
import Messages from '../../components/Messages';
import { shallow } from 'enzyme';
import { audit }  from '../../initialState';
import MessagesTableHeader from '../../components/MessagesTableHeader';
import MessageRow from '../../components/MessageRow';
import MessagesSearch from '../../components/MessagesSearch';
import Panel from '../../../panel/components';

describe("components", () => {

    let state, functions, props;

    beforeEach(() => {
        state = audit();
        functions = {
            fetchMessages: () => {},
            toggleStreaming: () => {},
            stopStream: () => {},
            setActiveMessage: () => {},
            getSession: () => {},
            clearSession: () => {}
        };
        props = {
            ...state,
            ...functions
        };
    });

    describe("<Messages />", () => {

        it("should render a panel", () => {
            const wrapper = shallow(<Messages {...props} />);
            expect(wrapper.find(Panel)).to.have.lengthOf(1);
        });

        it("should pass <MessagesSearch /> to Panel", () => {
            state.messages.push({ id: 1}, {id: 2});
            const wrapper = shallow(<Messages {...props} />);
            let panel = wrapper.find(Panel),
                heading = panel.props().heading;

            var messagesSearchChild = heading.props.children.find(c => c.type === MessagesSearch );

            expect(messagesSearchChild).to.exist;
            expect(messagesSearchChild.props.cid).to.equal(state.cid);
            expect(messagesSearchChild.props.fetchMessages).to.equal(functions.fetchMessages);
            expect(messagesSearchChild.props.requestOptions).to.equal(state.requestOptions);
            expect(messagesSearchChild.props.requesting).to.equal(state.requesting);
            expect(messagesSearchChild.props.toggleStreaming).to.equal(functions.toggleStreaming);
        });

        it("should pass <MessagesTableHeader /> to Panel", () => {
            state.messages.push({ id: 1}, {id: 2});
            const wrapper = shallow(<Messages {...props} />);
            let panel = wrapper.find(Panel),
                body = panel.props().body;

            var messagesTableHeader = body.props.children.find(c => c.type === MessagesTableHeader );

            expect(messagesTableHeader).to.exist;
            expect(messagesTableHeader.props.cid).to.equal(state.cid);
            expect(messagesTableHeader.props.fetchMessages).to.equal(functions.fetchMessages);
            expect(messagesTableHeader.props.columns).to.equal(state.columns);
            expect(messagesTableHeader.props.requestOptions).to.equal(state.requestOptions);
        });

        it("should pass <MessageRow /> to Panel", () => {
            state.messages.push({ id: 1}, {id: 2});
            const wrapper = shallow(<Messages {...props} />);
            let panel = wrapper.find(Panel),
                body = panel.props().body;

            var rows = body.props.children[1].props.children;

            expect(rows).to.have.lengthOf(2);

            expect(rows[0].props.cid).to.equal(state.cid);
            expect(rows[0].props.columns).to.equal(state.columns);
            expect(rows[0].props.setActiveMessage).to.equal(functions.setActiveMessage);
            expect(rows[0].props.getSession).to.equal(functions.getSession);
            expect(rows[0].props.message).to.equal(state.messages[0]);

            expect(rows[1].props.cid).to.equal(state.cid);
            expect(rows[1].props.columns).to.equal(state.columns);
            expect(rows[1].props.setActiveMessage).to.equal(functions.setActiveMessage);
            expect(rows[1].props.getSession).to.equal(functions.getSession);
            expect(rows[1].props.message).to.equal(state.messages[1]);
        });

    });

});
