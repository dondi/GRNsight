import fetch from 'isomorphic-fetch';
const jsdom = require("jsdom");
const nock = require("nock");

const { document } = (new jsdom.JSDOM("")).window;
global.document = document;
global.window = document;

let $ = require("jquery")(document.defaultView);

global.$ = $;
const chai = require("chai");

const expect = chai.expect;
const sinon = require("sinon");
const serviceRoot = "http://localhost:5000"




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
      server.autoRespond = true;
    });
    
    afterEach(() => {
      server.restore();
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
  
    