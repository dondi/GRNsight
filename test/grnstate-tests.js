// defining the test suite for the grnState model object
const { grnState } = require("../web-client-classic/public/js/grnstate");

// dynamically import it inside an async function becauuse this allows
// This allows us to use Chai as an ES Module without
// converting all of GRNsight to an ES Module.
(async () => {
    const chai = await import("chai");
    chai.should(); // Activates "should" style assertions
})();

describe("The grnState model object", () => {
    it("should update the reset normalization maximum correctly", () => {
        grnState.workbook = {
            positiveWeights: [
                0.7715106466403678, 5.212343052095555, 0.826365326790911, 1.5180198066137216,
                0.27964603867183396, 2.9870960868914778, 0.7743557796125339, 0.6701684007311992,
                0.22069064019031245, 0.2841810246722045, 0.08852330457981578, 0.5563132195423768,
            ],
            negativeWeights: [
                -1.1672013354497313, -2.4438462486461163, -1.485274408559026, -0.7371671668856121,
                -2.9527940988546217, -3.3875125167057103, -0.0735729607899455, -0.12373154839822605,
                -0.5487650216350863, -0.442904423529279, -0.8662459811465724, -2.850006860838391,
                -1.5733259134754158, -0.02279063304065471, -1.9832439149172112,
                -0.25954746744906587,
            ],
        };
        grnState.resetNormalizationMax.should.equal(5.212343052095555);

        grnState.workbook = {
            positiveWeights: [1, 2, 3, 4, 5, 6, 7, 8],
            negativeWeights: [-1, -2, -3, -4, -5, -6, -7, -8],
        };
        grnState.resetNormalizationMax.should.equal(8);
    });

    it("should update, store, and return the species and taxon ID", () => {
        grnState.genePageData.species.should.equal("Saccharomyces_cerevisiae");
        grnState.genePageData.taxonJaspar.should.equal("4932");
        grnState.genePageData.taxonUniprot.should.equal("559292");
    });
});
