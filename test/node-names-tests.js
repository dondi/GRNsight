var expect = require("chai").expect;
const { proteinToGeneName } = require("../web-client-classic/public/js/node-names");
const { NETWORK_GRN_MODE, NETWORK_PPI_MODE } = require("../web-client-classic/public/js/constants");

describe("proteinToGeneName", () => {
    describe("in protein-protein interaction mode", () => {
        it("should remove a trailing lowercase p", () => {
            expect(proteinToGeneName("Aim32p", NETWORK_PPI_MODE)).to.equal("AIM32");
        });

        it("should remove a trailing uppercase P", () => {
            expect(proteinToGeneName("SOD2P", NETWORK_PPI_MODE)).to.equal("SOD2");
        });

        it("should remove only one trailing p", () => {
            expect(proteinToGeneName("ABCpp", NETWORK_PPI_MODE)).to.equal("ABCP");
        });

        it("should not remove a p that is not at the end of the name", () => {
            expect(proteinToGeneName("Pho4", NETWORK_PPI_MODE)).to.equal("PHO4");
            expect(proteinToGeneName("Spt15", NETWORK_PPI_MODE)).to.equal("SPT15");
        });

        it("should leave a name without a trailing p unchanged", () => {
            expect(proteinToGeneName("ACE2", NETWORK_PPI_MODE)).to.equal("ACE2");
        });

        it("should return an empty string for an empty name", () => {
            expect(proteinToGeneName("", NETWORK_PPI_MODE)).to.equal("");
        });
    });
});
