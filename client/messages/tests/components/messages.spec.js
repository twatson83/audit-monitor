import React from 'react';
import {expect} from 'chai';
import Messages from '../../components/Messages';
import { shallow } from 'enzyme';
import { audit }  from '../../initialState';
import MessagesHeader from '../../components/MessagesHeader';
import MessagesTable from '../../components/MessagesTable';
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
