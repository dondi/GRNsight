/* const { document } = (new JSDOM("")).window;
global.document = document;
global.window = document;

let $ = require("jquery")(document.defaultView);

global.$ = $;const chai = require("chai");

const expect = chai.expect;
const sinon = require("sinon");
const serviceRoot = $("#service-root").attr("value");




const {XMLSerializer} = require("w3c-xmlserializer");
global.XMLSerializer = XMLSerializer.expose.Window.XMLSerializer;

const apis = require(__dirname + "/../web-client/public/gene/api.js");

let uniprotDoc = document.implementation.createDocument("", "", null);

let uniprot = uniprotDoc.createElement("uniprot");
uniprotDoc.appendChild(uniprot);

let entry = uniprotDoc.createElement("entry");
uniprot.appendChild(entry);

let name = uniprotDoc.createElement("name");
let sequence = uniprotDoc.createElement("sequence");
entry.appendChild(name);
entry.appendChild(sequence);

let nameText = uniprotDoc.createTextNode("YHP1_YEAST");
let sequenceText = uniprotDoc.createTextNode("MESRNTVLPSLPNIITGTSNSPFQLHTLPNTNFPSDDQGDIRLPPLAASAHIVRPVVNIY" +
"KSPCDEERPKRKSPQAVDFLSQRVTTSMTPLSKPKKLSSHSPFTPTVRVCSKEQPPQSMH" +
"SYKKVNILTPLSAAKAVLTPTTRKEKKRSFAFITHSQETFPKKEPKIDNARLARRKRRRT" +
"SSYELGILQTAFDECPTPNKAKRIELSEQCNMSEKSVQIWFQNKRQAAKKHKNSGNTSHC" +
"KVHSNDSMSMISYSDAALEITSTPTSTKEAITAELLKTSPANTSSIFEDHHITPCKPGGQ" +
"LKFHRKSVLVKRTLSNTGHSEIIKSPKGKENRLKFNAYERKPLGEVDLNSFKN");
name.appendChild(nameText);
sequence.appendChild(sequenceText);

let protein = uniprotDoc.createElement("protein");
entry.appendChild(protein);

let reccomendedName = uniprotDoc.createElement("reccomendedName");
protein.appendChild(reccomendedName);

let fullName = uniprotDoc.createElement("fullName");
reccomendedName.appendChild(fullName);

let fullNameText = uniprotDoc.createTextNode("Homeobox protein YHP1");
fullName.appendChild(fullNameText);

let organism = uniprotDoc.createElement("organism");
entry.appendChild(organism);

let organismName = uniprotDoc.createElement("name");
organism.appendChild(organismName);

let organismNameText = uniprotDoc.createTextNode("Saccharomyces cerevisiae (strain ATCC 204508 / S288c)");
organismName.appendChild(organismNameText);


 const gene = "YHP1";
  describe("getUniProtInfo", () => {
    let stub;
    beforeEach(() => {
        stub = sinon.stub(global.window.api, "getUniProtInfo");
    });
    afterEach(() => {
        stub.restore();
    });
    it("should display the correct data", done => {
        stub.returns(Promise.resolve(uniprotDoc));
        global.window.api.getUniProtInfo(gene).then(info => {
          console.log(info);
            expect(info.getElementsByTagName("name")[0].childNodes[0].nodeValue).to.equal("YHP1_YEAST");
            expect(info.getElementsByTagName("sequence")[0].childNodes[0].nodeValue).to.equal("MESRNTVLPSLPNIITGTSN" +
        "SPFQLHTLPNTNFPSDDQGDIRLPPLAASAHIVRPVVNIY" +
        "KSPCDEERPKRKSPQAVDFLSQRVTTSMTPLSKPKKLSSHSPFTPTVRVCSKEQPPQSMH" +
        "SYKKVNILTPLSAAKAVLTPTTRKEKKRSFAFITHSQETFPKKEPKIDNARLARRKRRRT" +
        "SSYELGILQTAFDECPTPNKAKRIELSEQCNMSEKSVQIWFQNKRQAAKKHKNSGNTSHC" +
        "KVHSNDSMSMISYSDAALEITSTPTSTKEAITAELLKTSPANTSSIFEDHHITPCKPGGQ" +
        "LKFHRKSVLVKRTLSNTGHSEIIKSPKGKENRLKFNAYERKPLGEVDLNSFKN");
            expect(info.getElementsByTagName("protein")[0].childNodes[0].childNodes[0].childNodes[0].nodeValue)
            .to.equal("Homeobox protein YHP1");
            expect(info.getElementsByTagName("organism")[0].childNodes[0].childNodes[0].nodeValue)
            .to.equal("Saccharomyces cerevisiae (strain ATCC 204508 / S288c)");
        }).finally(done);
      // Do I need to create something like this for the remaining tests?"
      //  expect($(".jasparID").text()).to.equal("MA0267.1");
      // We can go even further by examining the resulting element(s) and expecting their content to match the
      // mock response, but we will leave this as 'further work' for now.

      // Since this happens asynchronously, we have to call the `done` argument to indicate that the test can
      // be concluded.
    });

});

describe("getUniProtInfo", () => {

// final result is a promise
// call this with known input
// part of what the function needs is a network request, alongside the query -
// tell fake server "idc who asks, make this response"
// mocks return the data ONLY IF the correct parameters are supplied
// set up fake server to only return happy answers with expected URLS and fail everything else

    let server;
    const jasparResponse = "{}"
    beforeEach(() => {
      server = sinon.createFakeServer();
    });
    const query = {
      symbol: "YHP1",
      species: "Saccharomyces_cerevisiae",
      taxon: 12345
    }
    const results = "{matrix_id : 69}";
    it("Make the correct calls", done => {
      const url = serviceRoot + "/uniprot/uploadlists/?from=GENENAME&to=ACC&format=tab&taxon=559292&query=YHP1"
      server.respondWith("GET", url, [
      200,
      {"content-type": "text"},
      "Can I go to bed now?"]);
      let callback = sinon.spy()
      global.window.api.getUniProtInfo(query, callback);
      server.respond();
      server.restore();
      console.log(callback);
      sinon.assert.calledWith(callback, ["Can I go to bed now?"]);
      done();
    })
});
*/