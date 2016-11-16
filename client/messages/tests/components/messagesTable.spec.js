import React from 'react';
import {expect} from 'chai';
import MessagesTable from '../../components/MessagesTable';
import { shallow, mount } from 'enzyme';
import { audit }  from '../../initialState';
import MessagesTableHeader from '../../components/MessagesTableHeader';
import MessageRow from '../../components/MessageRow';

describe("components", () => {

    describe("<MessagesTable />", () => {

        let state, functions, props,
            fetchMessagesArgs;

        beforeEach(() => {
            fetchMessagesArgs = null;

            state = audit();
            functions = {
                fetchMessages: (...args) => {
                    fetchMessagesArgs = args;
                },
                setActiveMessage: () => {},
                getSession: () => {}
            };
            props = {
                ...state,
                ...functions
            };
        });

        it("should render loading table cell if loading", () => {
            props.requesting = true;
            const wrapper = shallow(<MessagesTable {...props} />);
            let cell = wrapper.find(".loadingCell");
            expect(cell.length).to.equal(1);
        });

        it("should not render loading table cell if messages", () => {
            props.nessages = [{
                _id: "m1"
            }, {
                _id: "m2"
            }];
            const wrapper = shallow(<MessagesTable {...props} />);
            let cell = wrapper.find(".loadingCell");
            expect(cell.length).to.equal(0);
        });

        it("should render table header", () => {
            const wrapper = shallow(<MessagesTable {...props} />);
            let tableHeaders = wrapper.find(MessagesTableHeader);
            expect(tableHeaders.length).to.equal(1);
            expect(tableHeaders.node.props.cid).to.equal(state.cid);
            expect(tableHeaders.node.props.fetchMessages).to.equal(functions.fetchMessages);
            expect(tableHeaders.node.props.columns).to.equal(state.columns);
            expect(tableHeaders.node.props.requestOptions).to.equal(state.requestOptions);
        });

        it("should render a message row for each message", () => {
            props.messages = [{
                _id: "m1"
            }, {
                _id: "m2"
            }];
            const wrapper = shallow(<MessagesTable {...props} />);
            let rows = wrapper.find(MessageRow);
            expect(rows.length).to.equal(2);
            expect(rows.nodes[0].props.cid).to.equal(state.cid);
            expect(rows.nodes[0].props.setActiveMessage).to.equal(functions.setActiveMessage);
            expect(rows.nodes[0].props.getSession).to.equal(functions.getSession);
            expect(rows.nodes[0].props.message).to.equal(props.messages[0]);
            expect(rows.nodes[0].key).to.equal(props.messages[0]._id);
            expect(rows.nodes[1].props.cid).to.equal(state.cid);
            expect(rows.nodes[1].props.setActiveMessage).to.equal(functions.setActiveMessage);
            expect(rows.nodes[1].props.getSession).to.equal(functions.getSession);
            expect(rows.nodes[1].props.message).to.equal(props.messages[1]);
            expect(rows.nodes[1].key).to.equal(props.messages[1]._id);
        });

    });
});
