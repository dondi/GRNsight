/* var assert = require("assert");
var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var uniprotTest = require(__dirname + "/../server/controllers/api-test-controller");

import getGeneInformation from "./gene/api.js";




describe("Uniprot API", function () {
    it("should load", function () {
        var symbol = "YAP1";

        var req = {};
        var res = {
            send: sinon.spy()
        };

        uniprotTest.getUniprotTest(req, res);
        //console.log(res.send);
        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.equal("Hey");
    /*    expect(
            importController.sifToGrnsight(sifWithSemanticAndSyntacticErrors).errors.length
        ).to.equal(1);
    });
}); */
