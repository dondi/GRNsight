var assert = require("chai").assert;
var xlsx = require("node-xlsx");
var parseAllNetworkSheet = require(__dirname + "/../server/controllers/network-sheet-parser");

const FOLDER = "test-files/gene-name-modifications/";

const getNetwork = file => parseAllNetworkSheet.networks(xlsx.parse(FOLDER + file)).network;

const findWarning = network =>
    network.warnings.find(warning => warning.warningCode === "PPI_NAMING_CONVENTION");

describe("PPI invalid gene name warning", () => {
    it("should warn about invalid gene names in a PPI workbook", () => {
        const warning = findWarning(getNetwork("ppi-invalid-names.xlsx"));
        assert.exists(warning);
        assert.include(warning.errorDescription, "Aim32p!");
        assert.include(warning.errorDescription, "Sod2pExtraLong");
        assert.notInclude(warning.errorDescription, "Mns2p");
        assert.notInclude(warning.errorDescription, "undefined");
    });

    it("should not warn when all gene names are valid", () => {
        assert.notExists(findWarning(getNetwork("ppi-valid-names.xlsx")));
    });

    it("should not warn for a GRN workbook", () => {
        assert.notExists(findWarning(getNetwork("grn-invalid-names.xlsx")));
    });
});
