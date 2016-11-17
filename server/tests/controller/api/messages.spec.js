import {getMessage, getMessages, getSessionMessages } from '../../../controllers/api/messages';
const exports = require('../../../models/message');
import sinon from "sinon";
import {expect} from "chai";

describe("Controllers", () => {

    describe("API", () => {

        describe("messages", ()=> {

            describe("getMessages", () => {

                let req, res, statusSpy;

                beforeEach(() => {
                    statusSpy = sinon.stub();
                    req = {
                        query: {
                            query: "TestQuery",
                            sort: "TestSort",
                            sortDirection: "desc",
                            page: 2,
                            pageSize: 99,
                            start: "testStart",
                            end: "testEnd"
                        }
                    };
                    res = {
                        json: sinon.stub(),
                        status: sinon.stub().returns({
                            json: statusSpy
                        })
                    }
                });

                it("should find messages", async function() {
                    let messages = [{
                        id: "1"
                    }, {
                        id: "2"
                    }];
                    let findStub = sinon.stub(exports, "find").returns(messages);
                    await getMessages(req, res);
                    expect(findStub.called).to.be.true;
                    expect(findStub.calledWith(2, 99, "testStart", "testEnd", "TestQuery", "TestSort", "desc")).to.be.true;

                    expect(res.json.called).to.be.true;
                    expect(res.json.calledWith(sinon.match(messages))).to.be.true;
                    exports.find.restore();
                });

                it("should return 500 error if find messages throws", async function() {
                    let ex = {
                        message: "Test Exception"
                    };
                    let findStub = sinon.stub(exports, "find").throws(ex);
                    await getMessages(req, res);
                    expect(findStub.calledWith(2, 99, "testStart", "testEnd", "TestQuery", "TestSort", "desc")).to.be.true;
                    expect(res.status.calledWith(500)).to.be.true;
                    expect(statusSpy.calledWith("Test Exception")).to.be.true;
                    exports.find.restore();
                });
            });

            describe("getMessage", () => {

                let req, res, statusSpy;

                beforeEach(() => {
                    statusSpy = sinon.stub();
                    req = {
                        params: {
                            id: "testId"
                        }
                    };
                    res = {
                        json: sinon.stub(),
                        status: sinon.stub().returns({
                            json: statusSpy
                        })
                    };
                });

                it("should find message", async function() {
                    let message = {
                        id: "1"
                    };
                    let findStub = sinon.stub(exports, "getById").returns(message);
                    await getMessage(req, res);
                    expect(findStub.called).to.be.true;
                    expect(findStub.calledWith("testId")).to.be.true;

                    expect(res.json.called).to.be.true;
                    expect(res.json.calledWith(sinon.match(message))).to.be.true;
                    exports.getById.restore();
                });

                it("should return 500 error if getById throws", async function() {
                    let ex = {
                        message: "Test Exception"
                    };
                    let findStub = sinon.stub(exports, "getById").throws(ex);
                    await getMessage(req, res);
                    expect(findStub.calledWith("testId")).to.be.true;
                    expect(res.status.calledWith(500)).to.be.true;
                    expect(statusSpy.calledWith("Test Exception")).to.be.true;
                    exports.getById.restore();
                });

            });

            describe("getSessionMessages", () => {

                let req, res, statusSpy;

                beforeEach(() => {
                    statusSpy = sinon.stub();
                    req = {
                        params: {
                            sessionId: "testId"
                        }
                    };
                    res = {
                        json: sinon.stub(),
                        status: sinon.stub().returns({
                            json: statusSpy
                        })
                    };
                });

                it("should find session messages", async function() {
                    let messages = [{
                        id: "1"
                    }, {
                        id: "2"
                    }];
                    let findStub = sinon.stub(exports, "findBySession").returns(messages);
                    await getSessionMessages(req, res);
                    expect(findStub.called).to.be.true;
                    expect(findStub.calledWith("testId")).to.be.true;

                    expect(res.json.called).to.be.true;
                    expect(res.json.calledWith(sinon.match(messages))).to.be.true;
                    exports.findBySession.restore();
                });

                it("should return 500 error if findBySession throws", async function() {
                    let ex = {
                        message: "Test Exception"
                    };
                    let findStub = sinon.stub(exports, "findBySession").throws(ex);
                    await getSessionMessages(req, res);
                    expect(findStub.calledWith("testId")).to.be.true;
                    expect(res.status.calledWith(500)).to.be.true;
                    expect(statusSpy.calledWith("Test Exception")).to.be.true;
                    exports.findBySession.restore();
                });

            });

        });

    });

});