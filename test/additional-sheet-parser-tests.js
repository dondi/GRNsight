var assert = require("chai").assert;
var xlsx = require("node-xlsx");
var test = require("./test");
var parseAdditionalSheets = require(__dirname + "/../server/controllers/additional-sheet-parser");
var grnmapOutputWorkbookPath =
    __dirname +
    "/../test-files/spreadsheet-controller-test-files/" +
    "15-genes_28-edges_db5-MO-LK_Sigmoid_estimation_missing-values_output.xlsx";
var grnmapInputWorkbookPath =
    __dirname +
    "/../test-files/spreadsheet-controller-test-files/" +
    "15-genes_28-edges_db5-MO-LK_Sigmoid_estimation_missing-values.xlsx";

describe("additional-sheet-parser", function () {
    it("parses a GRNmap output workbook without throwing errors", function () {
        var workbook = xlsx.parse(grnmapOutputWorkbookPath);
        assert.doesNotThrow(function () {
            parseAdditionalSheets(workbook);
        });
    });

    it("parses a GRNmap input workbook without throwing errors", function () {
        var workbook = xlsx.parse(grnmapInputWorkbookPath);
        assert.doesNotThrow(function () {
            parseAdditionalSheets(workbook);
        });
    });

    it("handles missing data in _expression sheets", function () {
        var workbook = xlsx.parse(
            __dirname +
                "/../test-files/spreadsheet-controller-test-files/" +
                "log2_expression_with_missing_data.xlsx"
        );
        var data = parseAdditionalSheets(workbook);
        assert(data, {
            expression: {
                wt_log2_expression: {
                    timePoints: [15, 15, 15, 15, 30, 30, 30, 30, 30, 60, 60, 60, 60],
                    data: {
                        ACE2: [
                            0.6139,
                            -1.0689,
                            0.1906,
                            -0.398,
                            0.5827,
                            null,
                            -0.3947,
                            -0.6264,
                            0.3377,
                            0.817,
                            0.5566,
                            -0.4357,
                            -1.2497,
                        ],
                        ASH1: [
                            0.97, 0.3043, -0.9904, -0.2636, -0.382, 0.4206, -0.4911, -0.1284,
                            -0.7236, -1.3477, -1.0468, -1.0978, -0.9248,
                        ],
                        ZAP1: [
                            0.6594,
                            0.6135,
                            0.3238,
                            -0.3712,
                            1.4712,
                            1.9049,
                            0.599,
                            -0.2354,
                            -0.394,
                            2.9606,
                            3.5569,
                            1.3863,
                            null,
                        ],
                    },
                },
            },
            meta: {},
            test: {},
        });
    });

    // Commenting out bc we are restructuring how sheets are parsed.
    // Expression sheets will be parsed separately.
    // it("correctly identifies expression sheets by suffix", function () {
    //     var workbook = xlsx.parse(__dirname + "/../test-files/spreadsheet-controller-test-files/" +
    //     "expression_sheet_names_test.xlsx");
    //     var data = parseAdditionalSheets(workbook);
    //     assert(Object.keys(data.expression).length, 3);
    // });

    describe("optimization parameters sheet", function () {
        it("correctly parses optimization_parameters sheet", function () {
            var workbook = xlsx.parse(
                __dirname +
                    "/../test-files/spreadsheet-controller-test-files/" +
                    "optimization_parameters_test.xlsx"
            );
            var data = parseAdditionalSheets(workbook);

            assert(data.meta, {
                alpha: 0.02,
                kk_max: 1,
                MaxIter: 100000000,
                TolFun: 0.000001,
                MaxFunEval: 100000000,
                TolX: 0.000001,
                production_function: "Sigmoid",
                L_curve: 0,
                estimate_params: 1,
                make_graphs: 1,
                fix_P: 0,
                fix_b: 0,
                expression_timepoints: [15, 30, 60],
                Strain: ["wt", "dcin5", "dgln3", "dhap4", "dhmo1", "dzap1"],
                simulation_timepoints: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
            });
        });

        it("should return additionalSheetMissingColumnHeaderError", function () {
            test.additionalSheetMissingColumnHeaderError(
                "test-files/additional-sheet-test-files/optimization-parameters-missing-headers.xlsx",
                2
            );
        });

        it("should return unknownOptimizationParameterWarning", function () {
            test.unknownOptimizationParameterWarning(
                "test-files/additional-sheet-test-files/optimization-parameters-unknown-parameter.xlsx",
                1
            );
        });

        it("should return invalidOptimizationParameterWarning", function () {
            test.invalidOptimizationParameterWarning(
                "test-files/additional-sheet-test-files/optimization-parameters-invalid-optimization-parameter.xlsx",
                2
            );
        });
    });

    describe("unrecognized-sheet", function () {
        it("should return an unrecognized sheet warning when import", function () {
            test.unrecognizedSheetWarning(
                "test-files/additional-sheet-test-files/wrong-deg-sheet-name.xlsx",
                1
            );
            test.unrecognizedSheetWarning(
                "test-files/additional-sheet-test-files/wrong-prod-sheet-name.xlsx",
                1
            );
            test.unrecognizedSheetWarning(
                "test-files/additional-sheet-test-files/wrong-threshold_b-sheet-name.xlsx",
                1
            );
        });
    });

    describe("two column sheets", function () {
        it("correctly parses data in a 2-column format", function () {
            var workbook = xlsx.parse(
                __dirname +
                    "/../test-files/spreadsheet-controller-test-files/" +
                    "2_column_data_format_test.xlsx"
            );
            var data = parseAdditionalSheets(workbook);
            assert(data.twoColumnSheets["degradation_rates"], {
                ACE2: 0.1118,
                ASH1: 0.2166,
                CIN5: 0.1005,
                GCR2: 0.0963,
            });
        });

        it("should return twoColumnIdError", function () {
            test.twoColumnIdError(
                "test-files/additional-sheet-test-files/two-column-sheets-incorrect-cell-A1.xlsx",
                5
            );
        });

        it("should return additionalSheetIncorrectColumnHeaderError", function () {
            test.additionalSheetIncorrectColumnHeaderError(
                "test-files/additional-sheet-test-files/two-column-sheets-incorrect-column-header.xlsx",
                5
            );
        });

        it("should return additionalSheetMissingColumnHeaderError", function () {
            test.additionalSheetMissingColumnHeaderError(
                "test-files/additional-sheet-test-files/two-column-sheets-missing-column-header.xlsx",
                5
            );
        });

        it("should return twoColumnInvalidGeneTypeError", function () {
            test.twoColumnInvalidGeneTypeError(
                "test-files/additional-sheet-test-files/two-column-sheets-invalid-gene-type.xlsx",
                10
            );
        });

        it("should return twoColumnInvalidValueError", function () {
            test.twoColumnInvalidValueError(
                "test-files/additional-sheet-test-files/two-column-sheets-invalid-value.xlsx",
                10
            );
        });

        it("should return twoColumnInvalidGeneLengthError", function () {
            test.twoColumnInvalidGeneLengthError(
                "test-files/additional-sheet-test-files/two-column-sheets-invalid-gene-length.xlsx",
                5
            );
        });

        it("should return twoColumnSpecialCharacterError", function () {
            test.twoColumnSpecialCharacterError(
                "test-files/additional-sheet-test-files/two-column-sheets-special-character.xlsx",
                5
            );
        });

        it("should return additionalSheetExtraneousDataWarning", function () {
            test.additionalSheetExtraneousDataWarning(
                "test-files/additional-sheet-test-files/two-column-sheets-extraneous-data.xlsx",
                5
            );
        });

        it("should not return any warnings when two-column sheets are missing", function () {
            test.noWarnings(
                "test-files/additional-sheet-test-files/missing-deg-rates-sheet-no-warnings.xlsx"
            );
            test.noWarnings(
                "test-files/additional-sheet-test-files/missing-prod-rates-sheet-no-warnings.xlsx"
            );
            test.noWarnings(
                "test-files/additional-sheet-test-files/missing-threshold_b-sheet-no-warnings.xlsx"
            );
        });

        it("should not return any warnings when two-column sheets are blank", function () {
            test.noWarningsForAdditionalSheet(
                "test-files/additional-sheet-test-files/deg-rates-sheet-blank.xlsx",
                "degradation_rates"
            );
            test.noWarningsForAdditionalSheet(
                "test-files/additional-sheet-test-files/prod-rates-sheet-blank.xlsx",
                "production_rates"
            );
            test.noWarningsForAdditionalSheet(
                "test-files/additional-sheet-test-files/threshold_b-sheet-blank.xlsx",
                "threshold_b"
            );
        });

        it("should return missingGenesInTwoColumnSheetsWarning when sheets are present and not empty but missing all genes and values", function () {
            test.missingGenesInTwoColumnSheetsWarning(
                "test-files/additional-sheet-test-files/missing-all-deg-rate-genes-and-values.xlsx",
                1,
                "degradation_rates"
            );
            test.missingGenesInTwoColumnSheetsWarning(
                "test-files/additional-sheet-test-files/missing-all-prod-rate-genes-and-values.xlsx",
                1,
                "production_rates"
            );
            test.missingGenesInTwoColumnSheetsWarning(
                "test-files/additional-sheet-test-files/missing-all-threshold_b-genes-and-values.xlsx",
                1,
                "threshold_b"
            );
        });

        it("should return missingGenesInTwoColumnSheetsWarning when sheets are present and not empty but missing some genes and values", function () {
            test.missingGenesInTwoColumnSheetsWarning(
                "test-files/additional-sheet-test-files/missing-first-gene-and-deg-rate-value.xlsx",
                1,
                "degradation_rates"
            );
            test.missingGenesInTwoColumnSheetsWarning(
                "test-files/additional-sheet-test-files/missing-first-gene-and-prod-rate-value.xlsx",
                1,
                "production_rates"
            );
            test.missingGenesInTwoColumnSheetsWarning(
                "test-files/additional-sheet-test-files/missing-first-gene-and-threshold_b-value.xlsx",
                1,
                "threshold_b"
            );

            test.missingGenesInTwoColumnSheetsWarning(
                "test-files/additional-sheet-test-files/missing-last-gene-and-deg-rate-value.xlsx",
                1,
                "degradation_rates"
            );
            test.missingGenesInTwoColumnSheetsWarning(
                "test-files/additional-sheet-test-files/missing-last-gene-and-prod-rate-value.xlsx",
                1,
                "production_rates"
            );
            test.missingGenesInTwoColumnSheetsWarning(
                "test-files/additional-sheet-test-files/missing-last-gene-and-threshold_b-value.xlsx",
                1,
                "threshold_b"
            );

            test.missingGenesInTwoColumnSheetsWarning(
                "test-files/additional-sheet-test-files/missing-middle-gene-and-deg-rate-value.xlsx",
                1,
                "degradation_rates"
            );
            test.missingGenesInTwoColumnSheetsWarning(
                "test-files/additional-sheet-test-files/missing-middle-gene-and-prod-rate-value.xlsx",
                1,
                "production_rates"
            );
            test.missingGenesInTwoColumnSheetsWarning(
                "test-files/additional-sheet-test-files/missing-middle-gene-and-threshold_b-value.xlsx",
                1,
                "threshold_b"
            );
        });
    });

    describe("optimization diagnostics sheet", function () {
        it("should return additionalSheetIncorrectColumnHeader Error", function () {
            test.additionalSheetIncorrectColumnHeaderError(
                "test-files/additional-sheet-test-files/optimization-diagnostics-incorrect-column-headers.xlsx",
                2
            );
        });

        it("should return additionalSheetMissingColumnHeader Error", function () {
            test.additionalSheetMissingColumnHeaderError(
                "test-files/additional-sheet-test-files/optimization-diagnostics-missing-column-headers.xlsx",
                2
            );
        });

        it("should return unknownOptimizationDiagnosticsParameter Warning", function () {
            test.unknownOptimizationDiagnosticsParameterWarning(
                "test-files/additional-sheet-test-files/optimization-diagnostics-unknown-parameter.xlsx",
                1
            );
        });

        it("should return invalidOptimizationDiagnosticsValue Warning", function () {
            test.invalidOptimizationDiagnosticsValueWarning(
                "test-files/additional-sheet-test-files/optimization-diagnostics-invalid-value.xlsx",
                1
            );
        });

        it("should return optimizationDiagnosticsExtraneousData Warning", function () {
            test.optimizationDiagnosticsExtraneousDataWarning(
                "test-files/additional-sheet-test-files/optimization-diagnostics-extraneous-data.xlsx",
                3
            );
        });

        it("should return incorrectMSEGeneHeader Warning", function () {
            test.incorrectMSEGeneHeaderWarning(
                "test-files/additional-sheet-test-files/optimization-diagnostics-incorrect-MSE-gene-header.xlsx",
                1
            );
        });

        it("should return incorrectMSEHeader Warning", function () {
            test.incorrectMSEHeaderWarning(
                "test-files/additional-sheet-test-files/optimization-diagnostics-incorrect-MSE-header.xlsx",
                3
            );
        });

        it("should return missingMSEData Warning", function () {
            test.missingMSEDataWarning(
                "test-files/additional-sheet-test-files/optimization-diagnostics-missing-MSE-data.xlsx",
                10
            );
        });

        it("should return invalidMSEData Warning", function () {
            test.invalidMSEDataWarning(
                "test-files/additional-sheet-test-files/optimization-diagnostics-invalid-MSE-data.xlsx",
                4
            );
        });
    });
});
