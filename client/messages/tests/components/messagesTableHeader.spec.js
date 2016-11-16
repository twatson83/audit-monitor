import React from 'react';
import {expect} from 'chai';
import MessagesTableHeader from '../../components/MessagesTableHeader';
import { shallow, mount } from 'enzyme';
import { audit }  from '../../initialState';

describe("components", () => {

    describe("<MessagesTableHeader />", () => {

        let state, functions, props,
            fetchMessagesArgs;

        beforeEach(() => {
            fetchMessagesArgs = null;

            state = audit();
            functions = {
                fetchMessages: (...args) => {
                    fetchMessagesArgs = args;
                }
            };
            props = {
                ...state,
                ...functions
            };
        });

        describe("render method", () => {

            it("should render all columns", () => {
                const wrapper = shallow(<MessagesTableHeader {...props} />);
                Object.keys(props.columns).forEach(c => {
                    let th = wrapper.find(".messages-table__" + c + "-col");
                    expect(th.node).to.exist;
                    let thText = th.find("span").text();
                    expect(thText).to.equal(props.columns[c].Display);
                });
            });

            it("onClick should call sort method", () => {
                const wrapper = shallow(<MessagesTableHeader {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                sinon.spy(instance, "sort");
                let headerLink = wrapper.find(".messages-table__TypeName-col").find("a");
                headerLink.simulate("click", { preventDefault: () => {}});
                expect(instance.sort.called).to.be.true;
            });

            it("if data is sorted in ascending then the correct column should contain the sort icon", () => {
                props.requestOptions.sort = "TypeName";
                props.requestOptions.sortDirection = "asc";
                const wrapper = shallow(<MessagesTableHeader {...props} />);
                let icon = wrapper.find(".messages-table__TypeName-col").find("i");
                expect(icon.node).to.exist;
                expect(icon.hasClass("fa-chevron-up"));
            });

            it("if data is sorted in descending then the correct column should contain the sort icon", () => {
                props.requestOptions.sort = "TypeName";
                props.requestOptions.sortDirection = "desc";
                const wrapper = shallow(<MessagesTableHeader {...props} />);
                let icon = wrapper.find(".messages-table__TypeName-col").find("i");
                expect(icon.node).to.exist;
                expect(icon.hasClass("fa-chevron-down"));
            });

        });

        describe("sort method", () => {

            it("should fetch messages", () => {
                const wrapper = shallow(<MessagesTableHeader {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                instance.sort("TypeName");
                expect(fetchMessagesArgs).to.exist;
            });

            it("if the sort col is different then the new sort col should be set and sort direction should be asc", () => {
                props.requestOptions.sort = "DestinationAddress";
                props.requestOptions.sortDirection = "desc";
                const wrapper = shallow(<MessagesTableHeader {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                instance.sort("TypeName");
                expect(fetchMessagesArgs[0]).to.equal(props.cid);
                expect(fetchMessagesArgs[1].sort).to.equal("TypeName");
                expect(fetchMessagesArgs[1].sortDirection).to.equal("asc");
            });

            it("if the sort col is the same then the sort col should stay the same but the sort direction should be toggled", () => {
                props.requestOptions.sort = "TypeName";
                props.requestOptions.sortDirection = "desc";
                const wrapper = shallow(<MessagesTableHeader {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                instance.sort("TypeName");
                expect(fetchMessagesArgs[0]).to.equal(props.cid);
                expect(fetchMessagesArgs[1].sort).to.equal("TypeName");
                expect(fetchMessagesArgs[1].sortDirection).to.equal("asc");
            });

        });

    });
});
