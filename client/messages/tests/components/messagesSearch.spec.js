import React from 'react';
import {expect} from 'chai';
import { shallow, } from 'enzyme';
import { audit }  from '../../initialState';
import MessagesSearch from '../../components/MessagesSearch';
import DateTime from 'react-datetime';
import moment from 'moment';

describe("components", () => {

    describe("<MessagesSearch />", () => {

        let state, functions, props,
            fetchMessagesArgs, toggleStreamingArgs;

        beforeEach(() => {
            fetchMessagesArgs = null;
            toggleStreamingArgs = null;

            let fullState = audit();
            fullState.requestOptions.start = moment("10/11/2016", "DD/MM/YYYY").toISOString();
            fullState.requestOptions.end = moment("10/11/2017", "DD/MM/YYYY").toISOString();
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

        describe("render method", () => {

            it("should render the Start Date input", () => {
                const wrapper = shallow(<MessagesSearch {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                let startDateComponent = wrapper.find(".startDate");
                expect(startDateComponent).to.exist;
                expect(startDateComponent.type()).to.equal(DateTime);
                expect(startDateComponent.node.props.value.toISOString()).to.equal(state.requestOptions.start);
                expect(startDateComponent.node.props.onChange).to.equal(instance.startDateChange);
            });

            it("should render the End Date input", () => {
                const wrapper = shallow(<MessagesSearch {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                let startDateComponent = wrapper.find(".endDate");
                expect(startDateComponent).to.exist;
                expect(startDateComponent.type()).to.equal(DateTime);
                expect(startDateComponent.node.props.value.toISOString()).to.equal(state.requestOptions.end);
                expect(startDateComponent.node.props.onChange).to.equal(instance.endDateChange);
            });

            it("should render the query input", () => {
                state.requestOptions.query = "Testing Search";
                const wrapper = shallow(<MessagesSearch {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                let queryInput = wrapper.find("input.query");
                expect(queryInput).to.exist;
                expect(queryInput.node.props.value).to.equal(state.requestOptions.query);
                expect(queryInput.node.props.onChange).to.equal(instance.queryChange);
            });

            it("should render the next page button", () => {
                state.requestOptions.query = "Testing Search";
                const wrapper = shallow(<MessagesSearch {...props} />);
                let nextPageButton = wrapper.find("button.nextPage");
                expect(nextPageButton).to.exist;
            });

            it("should add disabled class to next page button if hasMorePages is false", () => {
                const wrapper = shallow(<MessagesSearch {...props} />);
                let nextPageButton = wrapper.find("button.nextPage");
                expect(nextPageButton.hasClass("button--disabled")).to.be.true;
            });

            it("should not add disabled class to next page button if hasMorePages is true", () => {
                state.requestOptions.hasMorePages = true;
                const wrapper = shallow(<MessagesSearch {...props} />);
                let nextPageButton = wrapper.find("button.nextPage");
                expect(nextPageButton.hasClass("button--disabled")).to.be.false;
            });

            it("should set onChange event on next page button if hasMorePages is true", () => {
                state.requestOptions.hasMorePages = true;
                const wrapper = shallow(<MessagesSearch {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                let nextPageButton = wrapper.find("button.nextPage");
                expect(nextPageButton.node.props.onClick).to.be.equal(instance.next);
            });

            it("should not set onChange event on next page button if hasMorePages is false", () => {
                const wrapper = shallow(<MessagesSearch {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                let nextPageButton = wrapper.find("button.nextPage");
                expect(nextPageButton.node.props.onClick).to.not.be.equal(instance.next);
            });

            it("should render the previous page button", () => {
                const wrapper = shallow(<MessagesSearch {...props} />);
                let prevPageButton = wrapper.find("button.prevPage");
                expect(prevPageButton).to.exist;
            });

            it("should add disabled class to previous page button if page is one", () => {
                state.requestOptions.page = 1;
                const wrapper = shallow(<MessagesSearch {...props} />);
                let prevPageButton = wrapper.find("button.prevPage");
                expect(prevPageButton.hasClass("button--disabled")).to.be.true;
            });

            it("should not add disabled class to previous page button if page is more than one", () => {
                state.requestOptions.page = 2;
                const wrapper = shallow(<MessagesSearch {...props} />);
                let prevPageButton = wrapper.find("button.prevPage");
                expect(prevPageButton.hasClass("button--disabled")).to.be.false;
            });

            it("should set onChange event on previous page button if page is more than one", () => {
                state.requestOptions.page = 2;
                const wrapper = shallow(<MessagesSearch {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                let prevPageButton = wrapper.find("button.prevPage");
                expect(prevPageButton.node.props.onClick).to.be.equal(instance.previous);
            });

            it("should not set onChange event on previous page button if page is one", () => {
                state.requestOptions.page = 1;
                const wrapper = shallow(<MessagesSearch {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                let prevPageButton = wrapper.find("button.prevPage");
                expect(prevPageButton.node.props.onClick).to.not.be.equal(instance.previous);
            });

            it("should render the toggle stream button", () => {
                const wrapper = shallow(<MessagesSearch {...props} />);
                let button = wrapper.find("button.toggleStream");
                expect(button).to.exist;
            });

            it("should set the onClick event on the stream button", () =>{
                const wrapper = shallow(<MessagesSearch {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                let button = wrapper.find("button.toggleStream");
                expect(button.node.props.onClick).to.be.equal(instance.toggleStreaming);
            });

            it("should set the stream button icon to stop if streaming has started", () => {
                state.requestOptions.started = true;
                const wrapper = shallow(<MessagesSearch {...props} />);
                let button = wrapper.find("button.toggleStream");
                expect(button.find("i").hasClass("fa-stop")).to.be.true;
            });

            it("should set the stream button icon to start if the streaming is stopped", () => {
                state.requestOptions.started = false;
                const wrapper = shallow(<MessagesSearch {...props} />);
                let button = wrapper.find("button.toggleStream");
                expect(button.find("i").hasClass("fa-play")).to.be.true;
            });

            it("should render the refresh button", () => {
                const wrapper = shallow(<MessagesSearch {...props} />);
                let button = wrapper.find("button.refresh");
                expect(button).to.exist;
            });

            it("should set the onClick event on the refresh button", () =>{
                const wrapper = shallow(<MessagesSearch {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                let button = wrapper.find("button.refresh");
                expect(button.node.props.onClick).to.be.equal(instance.search);
            });

            it("should set the refresh button icon to spin if requesting messages", () => {
                props.requesting = true;
                const wrapper = shallow(<MessagesSearch {...props} />);
                let button = wrapper.find("button.refresh");
                expect(button.find("i").hasClass("fa-spin")).to.be.true;
            });

            it("should not set the refresh button icon to spin if not requesting messages", () => {
                props.requesting = false;
                const wrapper = shallow(<MessagesSearch {...props} />);
                let button = wrapper.find("button.refresh");
                expect(button.find("i").hasClass("fa-spin")).to.not.be.true;
            });

        });

        describe("queryChange method", function(){

            it("should update query in state", function(){
                const wrapper = shallow(<MessagesSearch {...props} />);
                let input = wrapper.find("input.query");
                input.simulate("change", {target: {value: 'Test Search Value'}});
                let state = wrapper.state();
                expect(state.query).to.equal('Test Search Value');
            });

            it("should search using the new query", function(done){
                props.fetchMessages = (cid, newState) => {
                    expect(cid).to.equal(props.cid);
                    expect(newState.page).to.equal(props.requestOptions.page);
                    expect(newState.pageSize).to.equal(props.requestOptions.pageSize);
                    expect(newState.query).to.equal('Test Search Value');
                    expect(newState.start).to.equal(props.requestOptions.start);
                    expect(newState.end).to.equal(props.requestOptions.end);
                    done();
                };
                const wrapper = shallow(<MessagesSearch {...props} />);
                let input = wrapper.find("input.query");
                input.simulate("change", {target: {value: 'Test Search Value'}});
            });

        });

        describe("startDateChange method", function(){

            it("should update start in state", function(){
                let start = moment();
                const wrapper = shallow(<MessagesSearch {...props} />);
                let input = wrapper.find(".startDate");
                input.props().onChange(start);
                let state = wrapper.state();
                expect(state.start).to.equal(start.format());
            });

            it("should not search using the new start date if end date is not set", function(){
                let start = moment();
                props.requestOptions.end = null;
                const wrapper = shallow(<MessagesSearch {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                sinon.spy(instance, "search");
                let input = wrapper.find(".startDate");
                input.props().onChange(start);
                expect(instance.search.called).to.not.be.true;
            });

            it("should search using the new start date if end date is set", function(){
                let start = moment();
                const wrapper = shallow(<MessagesSearch {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                sinon.spy(instance, "search");
                let input = wrapper.find(".startDate");
                input.props().onChange(start);
                expect(instance.search.called).to.be.true;
            });

        });

        describe("endDateChange method", function(){

            it("should update end in state", function(){
                let end = moment();
                const wrapper = shallow(<MessagesSearch {...props} />);
                let input = wrapper.find(".endDate");
                input.props().onChange(end);
                let state = wrapper.state();
                expect(state.end).to.equal(end.format());
            });

            it("should not search using the new end date if start date is not set", function(){
                let end = moment();
                props.requestOptions.start = null;
                const wrapper = shallow(<MessagesSearch {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                sinon.spy(instance, "search");
                let input = wrapper.find(".endDate");
                input.props().onChange(end);
                expect(instance.search.called).to.not.be.true;
            });

            it("should search using the new end date if start date is set", function(){
                let end = moment();
                const wrapper = shallow(<MessagesSearch {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                sinon.spy(instance, "search");
                let input = wrapper.find(".endDate");
                input.props().onChange(end);
                expect(instance.search.called).to.be.true;
            });

        });

        describe("previous method", function(){

            it("clicking the previous page button should decrease the page number of pages is more than 1", function(done){
                props.requestOptions.page = 2;
                props.fetchMessages = (cid, newState) => {
                    expect(cid).to.equal(props.cid);
                    expect(newState.page).to.equal(1);
                    done();
                };
                const wrapper = shallow(<MessagesSearch {...props} />);
                let button = wrapper.find("button.prevPage");
                button.simulate("click", { preventDefault: () => {} });
            });

            it("clicking the previous page button should not decrease the page number of page is 1", function(){
                props.requestOptions.page = 1;
                const wrapper = shallow(<MessagesSearch {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                sinon.spy(instance, "previous");
                let button = wrapper.find("button.prevPage");
                button.simulate("click", { preventDefault: () => {} });
                expect(instance.previous.called).to.be.false;
                expect(props.requestOptions.page).to.equal(1);
            });

        });

        describe("next method", function(){

            it("clicking the next page button should increase the page number if there are more pages", function(done){
                props.requestOptions.hasMorePages = true;
                props.requestOptions.page = 2;
                props.fetchMessages = (cid, newState) => {
                    expect(cid).to.equal(props.cid);
                    expect(newState.page).to.equal(3);
                    done();
                };
                const wrapper = shallow(<MessagesSearch {...props} />);
                let button = wrapper.find("button.nextPage");
                button.simulate("click", { preventDefault: () => {} });
            });

            it("clicking the next page button should not increase the page number if there are no more pages", function(){
                props.requestOptions.hasMorePages = false;
                props.requestOptions.page = 2;
                const wrapper = shallow(<MessagesSearch {...props} />);
                let instance = wrapper.renderer.getMountedInstance();
                sinon.spy(instance, "previous");
                let button = wrapper.find("button.nextPage");
                button.simulate("click", { preventDefault: () => {} });
                expect(instance.previous.called).to.be.false;
                expect(props.requestOptions.page).to.equal(2);
            });

        });

        describe("toggleStreaming method", function(){

            it("clicking the toggle stream button should toggle streaming", function(done){
                props.requestOptions.started = false;
                props.toggleStreaming = (cid, stream) => {
                    expect(cid).to.equal(props.cid);
                    expect(stream).to.equal(true);
                    done();
                };
                const wrapper = shallow(<MessagesSearch {...props} />);
                let button = wrapper.find("button.toggleStream");
                button.simulate("click", { preventDefault: () => {} });
            });
        });

        describe("search method", function(){

            it("clicking the refresh button should search", function(done){
                props.fetchMessages = (cid, newState) => {
                    expect(cid).to.equal(props.cid);
                    expect(newState.page).to.equal(props.requestOptions.page);
                    expect(newState.pageSize).to.equal(props.requestOptions.pageSize);
                    expect(newState.query).to.equal(props.requestOptions.query);
                    expect(newState.start).to.equal(props.requestOptions.start);
                    expect(newState.end).to.equal(props.requestOptions.end);
                    done();
                };
                const wrapper = shallow(<MessagesSearch {...props} />);
                let button = wrapper.find("button.refresh");
                button.simulate("click", { preventDefault: () => {} });
            });
        });

    });

});