import React from 'react';
import {expect} from 'chai';
import MessagesHeader from '../../components/MessagesHeader';
import { shallow, } from 'enzyme';
import { audit }  from '../../initialState';
import MessagesSearch from '../../components/MessagesSearch';

describe("components", () => {

    describe("<MessagesHeader />", () => {

        let state, functions, props,
            fetchMessagesArgs, toggleStreamingArgs;

        beforeEach(() => {
            fetchMessagesArgs = null;
            toggleStreamingArgs = null;

            let fullState = audit();
            state = {
                cid: fullState.cid,
                requestOptions: fullState.requestOptions,
                requesting: fullState.requesting
            };

            functions = {
                fetchMessages: (...args) => {
                    fetchMessagesArgs = args;
                },
                toggleStreaming: (...args) => {
                    toggleStreamingArgs = args;
                }
            };
            props = {
                ...state,
                ...functions
            };
        });

        it("should render the MessageSearch component", () => {
            const wrapper = shallow(<MessagesHeader {...props} />);
            let searchComponent = wrapper.find(MessagesSearch);
            expect(searchComponent).to.exist;
            expect(searchComponent.node.props.cid).to.equal(state.cid);
            expect(searchComponent.node.props.requestOptions).to.equal(state.requestOptions);
            expect(searchComponent.node.props.requesting).to.equal(state.requesting);
            expect(searchComponent.node.props.toggleStreaming).to.equal(functions.toggleStreaming);
            expect(searchComponent.node.props.fetchMessages).to.equal(functions.fetchMessages);
        });

        it("should render the Audit Messages title", () => {
            const wrapper = shallow(<MessagesHeader {...props} />);
            let title = wrapper.find(".panel__title");
            expect(title).to.exist;
            expect(title.text()).to.equal("Audit Messages");
        });

    });

});