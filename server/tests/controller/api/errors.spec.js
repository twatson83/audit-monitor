import {getError, getErrors } from '../../../controllers/api/errors';
const errorsExports = require('../../../models/error');
import sinon from "sinon";
import {expect} from "chai";

describe("Controllers", () => {

    describe("API", () => {

        describe("errors", ()=> {

            describe("getErrors", () => {

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

                it("should find errors", async function() {
                    let errors = [{
                        id: "errors1"
                    }, {
                        id: "errors2"
                    }];
                    let findStub = sinon.stub(errorsExports, "find").returns(errors);
                    await getErrors(req, res);
                    expect(findStub.called).to.be.true;
                    expect(findStub.calledWith(2, 99, "testStart", "testEnd", "TestQuery", "TestSort", "desc")).to.be.true;

                    expect(res.json.called).to.be.true;
                    expect(res.json.calledWith(sinon.match(errors))).to.be.true;
                    errorsExports.find.restore();
                });

                it("should return 500 error if find errors throws", async function() {
                    let ex = {
                        message: "Test Exception"
                    };
                    let findStub = sinon.stub(errorsExports, "find").throws(ex);
                    await getErrors(req, res);
                    expect(findStub.calledWith(2, 99, "testStart", "testEnd", "TestQuery", "TestSort", "desc")).to.be.true;
                    expect(res.status.calledWith(500)).to.be.true;
                    expect(statusSpy.calledWith("Test Exception")).to.be.true;
                    errorsExports.find.restore();
                });
            });

            describe("getError", () => {

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

                it("should find error", async function() {
                    let error = {
                        id: "errors1"
                    };
                    let findStub = sinon.stub(errorsExports, "getById").returns(error);
                    await getError(req, res);
                    expect(findStub.called).to.be.true;
                    expect(findStub.calledWith("testId")).to.be.true;

                    expect(res.json.called).to.be.true;
                    expect(res.json.calledWith(sinon.match(error))).to.be.true;
                    errorsExports.getById.restore();
                });

                it("should return 500 error if getErrorById throws", async function() {
                    let ex = {
                        message: "Test Exception"
                    };
                    let findStub = sinon.stub(errorsExports, "getById").throws(ex);
                    await getError(req, res);
                    expect(findStub.calledWith("testId")).to.be.true;
                    expect(res.status.calledWith(500)).to.be.true;
                    expect(statusSpy.calledWith("Test Exception")).to.be.true;
                    errorsExports.getById.restore();
                });

            });

        });

    });

});