import React from 'react';
import {expect} from 'chai';
import MessageRow from '../../components/MessageRow';
import { shallow, } from 'enzyme';
import { audit }  from '../../initialState';
import moment from 'moment';

describe("components", () => {

    describe("<MessageRow />", () => {

        let state, functions, props,
            setActiveMessageArgs, getSessionArgs, message;

        beforeEach(() => {
            setActiveMessageArgs = null;
            getSessionArgs = null;
            message = {
                "_id": "TestId",
                "TypeName": "TestType",
                "TimeSent": "2016-10-16T14:33:58+00:00",
                "TimeReceived": "2016-11-16T14:33:58+00:00",
                "SourceAddress": "TestSource",
                "DestinationAddress": "TestDestination"
            };

            let fullState = audit();
            state = {
                cid: fullState.cid,
                columns: fullState.columns,
                message
            };

            functions = {
                setActiveMessage: (...args) => {
                    setActiveMessageArgs = args;
                },
                getSession: (...args) => {
                    getSessionArgs = args;
                }
            };
            props = {
                ...state,
                ...functions
            };
        });

        it("should render each table cell", () => {
            const wrapper = shallow(<MessageRow {...props} />);
            Object.keys(props.columns).forEach(c => {
                let node = wrapper.find("." + message._id + c).node;
                expect(node).to.exist;
            });
        });

        describe("getColValue", () => {

            it("should return formatted date if col type is datetine", () => {
                const wrapper = shallow(<MessageRow {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                let value = instance.getColValue("TimeReceived", props.columns.TimeReceived, message);
                expect(value).to.equal(moment(message["TimeReceived"]).format("DD/MM/YYYY HH:mm:ss"));
            });

            it("should return col value if col type is string", () => {
                const wrapper = shallow(<MessageRow {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                let value = instance.getColValue("DestinationAddress", props.columns.DestinationAddress, message);
                expect(value).to.equal(message.DestinationAddress);
            });

            it("should return hyperlink if call type is link", () => {
                const wrapper = shallow(<MessageRow {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                let value = instance.getColValue("TypeName", props.columns.TypeName, message);
                expect(value.type).to.equal("a");
            });

        });

    });

});