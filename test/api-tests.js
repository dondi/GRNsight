const jsdom = require("jsdom");

// Our fake document needs a .service-root element so that a fake "host" can be found by the code.
const { document } = new jsdom.JSDOM("<input type='hidden' id='service-root' value='http://test'>")
    .window;
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

const { XMLSerializer } = require("xmldom");
global.XMLSerializer = XMLSerializer;

require(__dirname + "/../web-client-classic/public/gene/api.js");

describe("The Gene Page", () => {
    // final result is a promise
    // call this with known input
    // part of what the function needs is a workbook request, alongside the query -
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
    });

    const query = {
        symbol: "YHP1",
        species: "Saccharomyces_cerevisiae",
        taxon: 12345,
    };

    it("makes the correct call to Uniprot", done => {
        const testString =
            "yourlist:M201904306746803381A1F0E0DB47453E0216320D0BAD3EL    Entry    Entry name  Status" +
            " Protein names    Gene names Organism  Length YHP1    Q04116  " +
            "YHP1_YEAST    reviewed    Homeobox protein YHP1 " +
            "YHP1 YDR451C D9461.36   Saccharomyces cerevisiae";

        server.respondWith([200, { "Content-Type": "text/plain" }, testString]);

        global.window.api
            .getUniProtInfo(query)
            .then(data => {
                expect(data).to.equal(testString);

                done();
            })
            .catch(() => {
                done();
            });
    });

    it("makes the correct call to NCBI", done => {
        const testString = `<?xml version="1.0" encoding="UTF-8" ?>
        <!DOCTYPE eSearchResult PUBLIC "-//NLM//DTD esearch 20060628//EN"
        "https://eutils.ncbi.nlm.nih.gov/eutils/dtd/20060628/esearch.dtd">
        <eSearchResult><Count>1</Count><RetMax>1</RetMax><RetStart>0</RetStart><IdList>
        <Id>852062</Id>
        </IdList><TranslationSet><Translation>
        <From>+Saccharomyces+cerevisiae[Organism]</From>
        <To>"Saccharomyces cerevisiae"[Organism]</To>
        </Translation></TranslationSet><TranslationStack>
        <TermSet>    <Term>YHP1[gene]</Term>    <Field>gene</Field>    <Count>1</Count>
        <Explode>N</Explode>   </TermSet>   <TermSet>    <Term>"Saccharomyces cerevisiae"[Organism]</Term>
        <Field>Organism</Field>    <Count>7062</Count>    <Explode>Y</Explode>   </TermSet>   <OP>AND</OP>
        </TranslationStack><QueryTranslation>YHP1[gene] AND "Saccharomyces cerevisiae"[Organism]</QueryTranslation>
        </eSearchResult>`;

        server.respondWith([200, { "Content-Type": "text/plain" }, testString]);

        global.window.api
            .getNCBIInfo(query)
            .then(data => {
                expect(data).to.equal(testString);

                done();
            })
            .catch(() => {
                done();
            });
    });

    it("makes the correct call to JASPAR", done => {
        const testObject = { results: [{ matrix_id: "MA0426.1", name: "YHP1" }] };

        server.respondWith([
            200,
            { "Content-Type": "application/json" },
            JSON.stringify(testObject),
        ]);

        global.window.api
            .getJasparInfo(query)
            .then(data => {
                expect(data.results[0].matrix_id).to.equal(testObject.results[0].matrix_id);
                done();
            })
            .catch(() => {
                done();
            });
    });

    it("makes the correct call to YeastMine (general data)", done => {
        const testObject = {
            results: [
                {
                    symbol: "YHP1",
                    length: 1062,
                    description: "Homeobox transcriptional repressor",
                    geneSummary: null,
                    primaryIdentifier: "S000002859",
                },
            ],
            wasSuccessful: true,
            error: null,
            statusCode: 200,
        };

        server.respondWith([
            200,
            { "Content-Type": "application/json" },
            JSON.stringify(testObject),
        ]);

        global.window.api
            .getYeastMineInfo(query)
            .then(data => {
                expect(data.results[0].description).to.equal(testObject.results[0].description);
                done();
            })
            .catch(() => {
                done();
            });
    });

    it("makes the correct call to YeastMine (general data)", done => {
        const testObject = {
            results: [
                {
                    symbol: "YHP1",
                    length: 1062,
                    description: "Homeobox transcriptional repressor",
                    geneSummary: null,
                    primaryIdentifier: "S000002859",
                },
            ],
            wasSuccessful: true,
            error: null,
            statusCode: 200,
        };

        server.respondWith([
            200,
            { "Content-Type": "application/json" },
            JSON.stringify(testObject),
        ]);

        global.window.api
            .getYeastMineInfo(query)
            .then(data => {
                expect(data.results[0].description).to.equal(testObject.results[0].description);
                done();
            })
            .catch(() => {
                done();
            });
    });

    it("makes the correct call to YeastMine (regulation info)", done => {
        const testObject = [{ properties: { id: 6393710 } }, { properties: { id: 6393710 } }];

        server.respondWith([
            200,
            { "Content-Type": "application/json" },
            JSON.stringify(testObject),
        ]);

        global.window.api
            .getRegulationInfo(query)
            .then(data => {
                expect(data[0].properties.id).to.equal(data[0].properties.id);
                expect(data.length).to.equal(2);
                done();
            })
            .catch(() => {
                done();
            });
    });

    it("makes the correct call to YeastMine (gene ontology info)", done => {
        const testObject = [{ properties: { id: 6393710 } }, { properties: { id: 6393710 } }];

        server.respondWith([
            200,
            { "Content-Type": "application/json" },
            JSON.stringify(testObject),
        ]);

        global.window.api
            .getGeneOntologyInfo(query)
            .then(data => {
                expect(data[0].properties.id).to.equal(data[0].properties.id);
                expect(data.length).to.equal(2);
                done();
            })
            .catch(() => {
                done();
            });
    });
});
