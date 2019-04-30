import fetch from 'isomorphic-fetch';
const jsdom = require("jsdom");
const nock = require("nock");

// Our fake document needs a #service-root element so that a fake "host" can be found by the code.
const { document } = (new jsdom.JSDOM("<input type='hidden' id='service-root' value='http://test'>")).window;
global.document = document;
global.window = document;

// 1. JSDOM puts the XMLHttpRequest in document.defaultView
// 2. jQuery looks for it there
// 3. But Sinon looks for it in _global_, so we have to put it there before loading Sinon
global.XMLHttpRequest = document.defaultView.XMLHttpRequest;

let $ = require("jquery")(document.defaultView);

global.$ = $;
const chai = require("chai");

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

// final result is a promise
// call this with known input
// part of what the function needs is a network request, alongside the query -
// tell fake server "idc who asks, make this response"
// mocks return the data ONLY IF the correct parameters are supplied
// set up fake server to only return happy answers with expected URLS and fail everything else

    let server;
    beforeEach(() => {
      server = sinon.createFakeServer();
      server.respondImmediately = true;

      // Sinon replaces global.XMLHttpRequest but not the one in document.defaultView.
      // However, that's where jQuery looks for XMLHttpRequest so we need to manually
      // "install" it there.
      document.defaultView.XMLHttpRequest = global.XMLHttpRequest;
    });
    
    afterEach(() => {
      server.restore();

      // By the same token, Sinon’s restoration affects global.XMLHttpRequest. We then need
      // to manually restore this to document.defaultView.
      document.defaultView.XMLHttpRequest = global.XMLHttpRequest;
    })
    
    const query = {
      symbol: "YHP1",
      species: "Saccharomyces_cerevisiae",
      taxon: 12345
    }
    
    
  const testString = `yourlist:M201904306746803381A1F0E0DB47453E0216320D0BAD3EL	Entry	Entry name	Status	Protein names	Gene names	Organism 
  	Length YHP1	Q04116	YHP1_YEAST	reviewed	Homeobox protein YHP1	YHP1 YDR451C D9461.36	Saccharomyces cerevisiae`;
    
    
    it("Make the correct calls", done => {
      
      let uniprotDoc = document.implementation.createDocument("", "", null);
      let sequenceText = uniprotDoc.createTextNode(testString);
      uniprotDoc.appendChild(sequenceText);
      
      const url = serviceRoot + "/uniprot/uploadlists/?from=GENENAME&to=ACC&format=tab&taxon=559292&query=YHP1"
      console.log(url);
      server.respondWith([
        200,
        {'Content-Type': 'text/plain' }, testString]);
      
        
     global.window.api.getUniProtInfo(query).then((data) => {
       // console.log("Finally made it here");
      //   console.log(data);
        done();
      }).catch((error) => {
      //  console.log(error)
        done();
      });

  });
});

describe("getUniProtInfo", () => {
  
  
  
  const testString = `yourlist:M201904306746803381A1F0E0DB47453E0216320D0BAD3EL	Entry	Entry name	Status	Protein names	Gene names	Organism 
    Length YHP1	Q04116	YHP1_YEAST	reviewed	Homeobox protein YHP1	YHP1 YDR451C D9461.36	Saccharomyces cerevisiae`;
    
   it('should get events', (done) => {
     let scope = nock("http://localhost:5000")
     .get("/uniprot/uploadlists/?from=GENENAME&to=ACC&format=tab&taxon=559292&query=YHP1")
           .reply(200, testString);
     console.log(scope);
     const YHP1 = {
       symbol: "YHP1",
       species: "Saccharomyces_cerevisiae",
       taxon: "559292",
     };
     
     global.window.api.getUniProtInfo(YHP1) 
           .then(response => {
             console.log(response);
             done();
           }).catch(error => {
             console.log(error);
             done();
           })
      nock.cleanAll();
   })
})
  
    