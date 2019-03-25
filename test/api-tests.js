const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const { JSDOM } = require("jsdom");
const { document } = (new JSDOM('')).window;
global.document = document;
global.window = document;

const $ = require('jquery')(document.defaultView);
global.$ = $;

const {XMLSerializer} = require('w3c-xmlserializer');
global.XMLSerializer = XMLSerializer.expose.Window.XMLSerializer;

const apis = require(__dirname + "/../web-client/public/gene/api.js");


let NCBIDoc = global.document.implementation.createDocument("", "", null);
let data = NCBIDoc.createElement("eSummaryResult");
NCBIDoc.appendChild(data);

let docSummary = NCBIDoc.createElement("DocumentSummarySet");
data.appendChild(docSummary);

let name = NCBIDoc.createElement("name");
docSummary.appendChild(name);

let nameText = NCBIDoc.createTextNode("ACE2")
name.appendChild(nameText)

const gene = "ACE2";
describe("getNCBIInfo", () => {
  
    let stub;
    beforeEach(() => {
      stub = sinon.stub(global.window.api, "getNCBIInfo");
    /*  stub.returns(Promise.resolve({
          class: "C2H2 zinc finger factors",
          family: "Other factors with up to three adjacent zinc fingers",
          frequencyMatrix: {
              A: [45, 1, 0, 90, 0, 0, 49],
              C: [28, 92, 100, 10, 0, 100, 20],
              G: [21, 6, 0, 0, 100, 0, 17],
              T: [5, 1, 0, 0, 0, 0, 14]
          },
          jasparID: "MA0267.1"
      }));
      stub.callsFake(() => console.log("MOCK GETNCBIINFO"));
      /*  const stub = sinon.stub(global.window.api, "getJasparInfo");
        stub.returns(Promise.resolve({
            class: "C2H2 zinc finger factors",
            family: "Other factors with up to three adjacent zinc fingers",
            frequencyMatrix: {
                A: [45, 1, 0, 90, 0, 0, 49],
                C: [28, 92, 100, 10, 0, 100, 20],
                G: [21, 6, 0, 0, 100, 0, 17],
                T: [5, 1, 0, 0, 0, 0, 14]
            },
            jasparID: "MA0267.1"
        })); */
    });
    
    afterEach(() => {
      stub.restore();
    });

    it("should display the correct data", done => {
      global.window.api.getGeneInformation(gene).then(info => {
        console.log(info);
        done();
      })
      //  expect($(".jasparID").text()).to.equal("MA0267.1");
      // We can go even further by examining the resulting element(s) and expecting their content to match the
      // mock response, but we will leave this as 'further work' for now.

      // Since this happens asynchronously, we have to call the `done` argument to indicate that the test can
      // be concluded.
    });

});
