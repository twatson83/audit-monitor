import {getEndpoints} from '../../../controllers/api/endpoints';
const endpointExports = require('../../../models/endpoint');
import sinon from "sinon";
import {expect} from "chai";

describe("Controllers", () => {

    describe("API", () => {

        describe("endpoints", ()=> {

            describe("getEndpoints", () => {

                let req, res, statusSpy;

                beforeEach(() => {
                    statusSpy = sinon.stub();
                    req = {
                        query: {
                            query: "TestQuery",
                            sort: "TestSort",
                            sortDirection: "desc"
                        }
                    };
                    res = {
                        json: sinon.stub(),
                        status: sinon.stub().returns({
                            json: statusSpy
                        })
                    }
                });

                it("should find endpoints", async function() {
                    let endpoints = [{
                        id: "Endpoint1"
                    }, {
                        id: "Endpoint2"
                    }];
                    let findStub = sinon.stub(endpointExports, "find").returns(endpoints);
                    await getEndpoints(req, res);
                    expect(findStub.called).to.be.true;
                    expect(findStub.calledWith("TestQuery", "TestSort", "desc")).to.be.true;

                    expect(res.json.called).to.be.true;
                    expect(res.json.calledWith(sinon.match(endpoints))).to.be.true;
                    endpointExports.find.restore();
                });

                it("should return 500 error if find endpoints throws", async function() {
                    let ex = {
                        message: "Test Exception"
                    };
                    let findStub = sinon.stub(endpointExports, "find").throws(ex);
                    await getEndpoints(req, res);
                    expect(findStub.calledWith("TestQuery", "TestSort", "desc")).to.be.true;
                    expect(res.status.calledWith(500)).to.be.true;
                    expect(statusSpy.calledWith("Test Exception")).to.be.true;
                    endpointExports.find.restore();
                });
            });

        });

    });

});