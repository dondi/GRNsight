/* // require("browser-env")();
var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var gene = "ACE2";

var geneFunctions = require(__dirname + "/../web-client/public/gene/api");


console.log(typeof XMLSerializer);

describe("Uniprot API", function () {
    var request;

    beforeEach(function () {
        window.$ = $;
        request = sinon.useFakeXMLHttpRequest();
    });

    afterEach(function () {
        request.restore();
    });

    it("should load", function () {
        geneFunctions.getUniProtInfo(gene).done(function (result) {
            expect(result).to.not.be.undefined;
        });
    });
});

describe("Ensembl API", function () {
    it("should load", function () {
    });
});

describe("JASPAR API", function () {
    it("should load", function () {
    });
});

describe("SGD API", function () {
    it("should load", function () {
    });
});

describe("NCBI Gene API", function () {
    it("should load", function () {
    });
}); */
