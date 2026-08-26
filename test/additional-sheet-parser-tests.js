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

        it("should return twoColumnInvalidGeneTypeError", function () {
            test.twoColumnInvalidGeneTypeError(
                "test-files/additional-sheet-test-files/two-column-sheets-invalid-gene-type.xlsx",
                5
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

        describe("missing column header warnings", function () {
            const folder = "test-files/additional-sheet-test-files/missing-header/";

            const cases = {
                degradation_rates: [
                    "missing-deg-rate-headers-deg-rates-sheet.xlsx",
                    "blank-deg-rate-headers-deg-rates-sheet.xlsx",
                ],
                production_rates: [
                    "missing-prod-rate-headers-prod-rates-sheet.xlsx",
                    "blank-prod-rate-headers-prod-rates-sheet.xlsx",
                ],
                threshold_b: [
                    "missing-threshold_b-headers-threshold_b-sheet.xlsx",
                    "blank-threshold_b-headers-threshold_b-sheet.xlsx",
                ],
                optimized_production_rates: [
                    "missing-headers-opt-prod-rates-sheet.xlsx",
                    "blank-headers-opt-prod-rates-sheet.xlsx",
                ],
                optimized_threshold_b: [
                    "missing-headers-opt-threshold_b-sheet.xlsx",
                    "blank-headers-opt-threshold_b-sheet.xlsx",
                ],
            };

            for (const sheetName in cases) {
                it(`should contain MISSING_COLUMN_HEADER_${sheetName.toUpperCase()} when ${sheetName} sheet is missing column headers`, function () {
                    for (const fileName of cases[sheetName]) {
                        test.additionalSheetTwoColumnSheetsIncorrectOrMissingColumnHeaderWarning(
                            `${folder}${fileName}`,
                            1,
                            sheetName,
                            /*isMissingSheet=*/ true
                        );
                    }
                });
            }
        });

        describe("incorrect column header warnings", function () {
            const folder = "test-files/additional-sheet-test-files/wrong-header/";

            const cases = {
                degradation_rates: [
                    "wrong-deg-rate-header-deg-rates-sheet.xlsx",
                    "wrong-id-header-deg-rates-sheet.xlsx",
                ],
                production_rates: [
                    "wrong-prod-rate-header-prod-rates-sheet.xlsx",
                    "wrong-id-header-prod-rates-sheet.xlsx",
                ],
                threshold_b: [
                    "wrong-threshold_b-header-threshold_b-sheet.xlsx",
                    "wrong-id-header-threshold_b-sheet.xlsx",
                ],
                optimized_production_rates: [
                    "wrong-prod-rate-header-opt-prod-rates-sheet.xlsx",
                    "wrong-id-header-opt-prod-rates-sheet.xlsx",
                ],
                optimized_threshold_b: [
                    "wrong-threshold_b-header-opt-threshold_b-sheet.xlsx",
                    "wrong-id-header-opt-threshold_b-sheet.xlsx",
                ],
            };

            for (const sheetName in cases) {
                it(`should contain MISSING_COLUMN_HEADER_${sheetName.toUpperCase()} when ${sheetName} sheet has incorrect column headers`, function () {
                    for (const fileName of cases[sheetName]) {
                        test.additionalSheetTwoColumnSheetsIncorrectOrMissingColumnHeaderWarning(
                            `${folder}${fileName}`,
                            1,
                            sheetName
                        );
                    }
                });
            }
        });

        describe("wrong data type error", function () {
            const folder = "test-files/additional-sheet-test-files/wrong-datatype/";

            const cases = {
                degradation_rates: "wrong-datatype-deg.xlsx",
                production_rates: "wrong-datatype-prod.xlsx",
                threshold_b: "wrong-datatype-threshold_b.xlsx",
                optimized_production_rates: "wrong-datatype-opt-prod-rates.xlsx",
                optimized_threshold_b: "wrong-datatype-opt-threshold_b.xlsx",
            };

            for (const sheetName in cases) {
                it(`for ${sheetName} sheet`, function () {
                    test.twoColumnInvalidDataTypeError(
                        `${folder}${cases[sheetName]}`,
                        sheetName,
                        1
                    );
                });
            }
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

        it("should return 1 warning when two-column sheets are blank", function () {
            test.missingGenesAndValuesWarningWhenImporting(
                "test-files/additional-sheet-test-files/deg-rates-sheet-blank.xlsx",
                1
            );
            test.missingGenesAndValuesWarningWhenImporting(
                "test-files/additional-sheet-test-files/prod-rates-sheet-blank.xlsx",
                1
            );
            test.missingGenesAndValuesWarningWhenImporting(
                "test-files/additional-sheet-test-files/threshold_b-sheet-blank.xlsx",
                1
            );
        });

        describe("should return MISSING_ALL_GENES_AND_VALUES warning when sheets are present and not empty but missing all genes and values", function () {
            const folder = "test-files/additional-sheet-test-files/missing-all-genes/";

            const cases = {
                degradation_rates: "missing-all-deg-rate-genes-and-values.xlsx",
                production_rates: "missing-all-prod-rate-genes-and-values.xlsx",
                threshold_b: "missing-all-threshold_b-genes-and-values.xlsx",
                optimized_production_rates: "missing-all-optimized-prod-rate-genes-and-values.xlsx",
                optimized_threshold_b: "missing-all-optimized-threshold_b-genes-and-values.xlsx",
            };

            for (const sheetName in cases) {
                const expectedText = sheetName.includes("optimized")
                    ? "GRNsight is checking because"
                    : "will need to be supplied to use this workbook as an input file for GRNmap,";

                it(`for ${sheetName} sheet`, function () {
                    test.missingAllGenesInTwoColumnSheetWarning(
                        `${folder}${cases[sheetName]}`,
                        1,
                        sheetName,
                        expectedText
                    );
                });
            }
        });

        describe("should return MISSING_ALL_VALUES warning when all of the values of genes are missing", function () {
            const folder = "test-files/additional-sheet-test-files/missing-all-values/";

            const cases = {
                degradation_rates: "missing-all-deg-rate-values.xlsx",
                production_rates: "missing-all-prod-rate-values.xlsx",
                threshold_b: "missing-all-threshold_b-values.xlsx",
                optimized_production_rates: "missing-all-optimized-prod-rate-values.xlsx",
                optimized_threshold_b: "missing-all-optimized-threshold_b-values.xlsx",
            };

            for (const sheetName in cases) {
                const expectedText = "GRNsight has detected";

                it(`for ${sheetName} sheet`, function () {
                    test.missingAllValuesForGenes(
                        `${folder}${cases[sheetName]}`,
                        1,
                        sheetName,
                        expectedText
                    );
                });
            }
        });

        describe("should return MISSING_GENES_AND_VALUES when sheets are present and not empty but missing some genes and values", function () {
            const folder = "test-files/additional-sheet-test-files/missing-some-genes-and-values/";

            const cases = {
                degradation_rates: [
                    "missing-first-gene-and-deg-rate-value.xlsx",
                    "missing-middle-gene-and-deg-rate-value.xlsx",
                    "missing-last-gene-and-deg-rate-value.xlsx",
                ],
                production_rates: [
                    "missing-first-gene-and-prod-rate-value.xlsx",
                    "missing-middle-gene-and-prod-rate-value.xlsx",
                    "missing-last-gene-and-prod-rate-value.xlsx",
                ],
                threshold_b: [
                    "missing-first-gene-and-threshold_b-value.xlsx",
                    "missing-middle-gene-and-threshold_b-value.xlsx",
                    "missing-last-gene-and-threshold_b-value.xlsx",
                ],
                optimized_production_rates: [
                    "missing-first-opt-prod-rate-gene-and-value.xlsx",
                    "missing-middle-opt-prod-rate-gene-and-value.xlsx",
                    "missing-last-opt-prod-rate-gene-and-value.xlsx",
                ],
                optimized_threshold_b: [
                    "missing-first-opt-threshold_b-gene-and-value.xlsx",
                    "missing-middle-opt-threshold_b-gene-and-value.xlsx",
                    "missing-last-opt-threshold_b-gene-and-value.xlsx",
                ],
            };

            for (const sheetName in cases) {
                const expectedText = sheetName.includes("optimized")
                    ? "GRNsight is checking because"
                    : "will need to be supplied to use this workbook as an input file for GRNmap,";

                it(`for ${sheetName} sheet`, function () {
                    for (const fileName of cases[sheetName]) {
                        test.missingGenesAndValuesInTwoColumnSheetsWarning(
                            `${folder}${fileName}`,
                            1,
                            sheetName,
                            expectedText
                        );
                    }
                });
            }
        });

        describe("should return MISSING_VALUES warning when sheets are present and not empty but missing values for some genes", function () {
            const folder = "test-files/additional-sheet-test-files/missing-some-values/";

            const cases = {
                degradation_rates: [
                    "missing-first-deg-rate-value.xlsx",
                    "missing-middle-deg-rate-value.xlsx",
                    "missing-last-deg-rate-value.xlsx",
                ],
                production_rates: [
                    "missing-first-prod-rate-value.xlsx",
                    "missing-middle-prod-rate-value.xlsx",
                    "missing-last-prod-rate-value.xlsx",
                ],
                threshold_b: [
                    "missing-first-threshold_b-value.xlsx",
                    "missing-middle-threshold_b-value.xlsx",
                    "missing-last-threshold_b-value.xlsx",
                ],
                optimized_production_rates: [
                    "missing-first-opt-prod-rate-value.xlsx",
                    "missing-middle-opt-prod-rate-value.xlsx",
                    "missing-last-opt-prod-rate-value.xlsx",
                ],
                optimized_threshold_b: [
                    "missing-first-opt-threshold_b-value.xlsx",
                    "missing-middle-opt-threshold_b-value.xlsx",
                    "missing-last-opt-threshold_b-value.xlsx",
                ],
            };

            for (const sheetName in cases) {
                const expectedText = sheetName.includes("optimized")
                    ? "GRNsight is checking because"
                    : "will need to be supplied to use this workbook as an input file for GRNmap,";

                it(`for ${sheetName} sheet`, function () {
                    for (const fileName of cases[sheetName]) {
                        test.someGenesMissingValuesWarning(
                            `${folder}${fileName}`,
                            1,
                            sheetName,
                            expectedText
                        );
                    }
                });
            }
        });

        describe("should return MISSING_GENE_IDS_FOR_VALUES warning when sheets are present and not empty but missing gene IDs for values", function () {
            const folder = "test-files/additional-sheet-test-files/missing-geneId-with-values/";

            const cases = {
                degradation_rates: [
                    "missing-first-geneID-on-deg-rates-sheet.xlsx",
                    "missing-middle-geneID-on-deg-rates-sheet.xlsx",
                    "missing-last-geneID-on-deg-rates-sheet.xlsx",
                ],
                production_rates: [
                    "missing-first-geneID-on-prod-rates-sheet.xlsx",
                    "missing-middle-geneID-on-prod-rates-sheet.xlsx",
                    "missing-last-geneID-on-prod-rates-sheet.xlsx",
                ],
                threshold_b: [
                    "missing-first-geneID-on-threshold_b-sheet.xlsx",
                    "missing-middle-geneID-on-threshold_b-sheet.xlsx",
                    "missing-last-geneID-on-threshold_b-sheet.xlsx",
                ],
                optimized_production_rates: [
                    "missing-first-geneID-on-opt-prod-rates-sheet.xlsx",
                    "missing-middle-geneID-on-opt-prod-rates-sheet.xlsx",
                    "missing-last-geneID-on-opt-prod-rates-sheet.xlsx",
                ],
                optimized_threshold_b: [
                    "missing-first-geneID-on-opt-threshold_b-sheet.xlsx",
                    "missing-middle-geneID-on-opt-threshold_b-sheet.xlsx",
                    "missing-last-geneID-on-opt-threshold_b-sheet.xlsx",
                ],
            };

            for (const sheetName in cases) {
                const expectedText = sheetName.includes("optimized")
                    ? "GRNsight is checking because"
                    : "will need to be supplied to use this workbook as an input file for GRNmap,";

                it(`for ${sheetName} sheet`, function () {
                    for (const fileName of cases[sheetName]) {
                        test.missingGeneIdsWithValuesInTwoColumnSheetWarning(
                            `${folder}${fileName}`,
                            1,
                            sheetName,
                            expectedText
                        );
                    }
                });
            }
        });

        describe("should return WRONG_GENE_ORDER warning when sheets are present and not empty but the order of genes is not the same as the network sheet", function () {
            const folder = "test-files/additional-sheet-test-files/wrong-gene-order/";

            const cases = {
                degradation_rates: "wrong-order-deg-rates-sheet.xlsx",
                production_rates: "wrong-order-prod-rates-sheet.xlsx",
                threshold_b: "wrong-order-threshold_b-sheet.xlsx",
                optimized_production_rates: "wrong-order-opt-prod-rates-sheet.xlsx",
                optimized_threshold_b: "wrong-order-opt-threshold_b-sheet.xlsx",
            };

            for (const sheetName in cases) {
                it(`for ${sheetName} sheet`, function () {
                    test.wrongGeneOrderInTwoColumnSheetWarning(
                        `${folder}${cases[sheetName]}`,
                        1,
                        sheetName
                    );
                });
            }
        });

        describe("should return EXTRA_GENES warning when sheets are present and not empty but contain extra genes", function () {
            const folder = "test-files/additional-sheet-test-files/extra-genes/";

            const cases = {
                degradation_rates: "extra-row-deg-rates-sheet.xlsx",
                production_rates: "extra-row-prod-rates-sheet.xlsx",
                threshold_b: "extra-row-threshold_b-sheet.xlsx",
                optimized_production_rates: "extra-row-opt-prod-rates-sheet.xlsx",
                optimized_threshold_b: "extra-row-opt-threshold_b-sheet.xlsx",
            };

            for (const sheetName in cases) {
                it(`for ${sheetName} sheet`, function () {
                    test.extraGenesInTwoColumnSheetWarning(
                        `${folder}${cases[sheetName]}`,
                        1,
                        sheetName
                    );
                });
            }
        });

        describe("should return WRONG_GENE_IDS warning when sheets are present and not empty but contain wrong gene IDs", function () {
            const folder = "test-files/additional-sheet-test-files/wrong-gene-ids/";
            const cases = {
                degradation_rates: "wrong-geneID-deg-rates-sheet.xlsx",
                production_rates: "wrong-geneID-prod-rates-sheet.xlsx",
                threshold_b: "wrong-geneID-threshold_b-sheet.xlsx",
                optimized_production_rates: "wrong-geneID-opt-prod-rates-sheet.xlsx",
                optimized_threshold_b: "wrong-geneID-opt-threshold_b-sheet.xlsx",
            };

            for (const sheetName in cases) {
                it(`for ${sheetName} sheet`, function () {
                    test.wrongGeneIdsWarning(`${folder}${cases[sheetName]}`, sheetName);
                });
            }
        });
    });

    describe("optimization diagnostics sheet", function () {
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

        it("should contain MISSING_COLUMN_HEADER_OPTIMIZATION_DIAGNOSTICS", function () {
            test.additionalSheetOptimizationDiagnosticIncorrectOrMissingColumnHeaderWarning(
                "test-files/additional-sheet-test-files/optimization-diagnostics-missing-header.xlsx",
                1,
                "optimization_diagnostics"
            );
        });

        it("should contain MISSING_COLUMN_HEADER_OPTIMIZATION_PARAMETERS", function () {
            test.additionalSheetOptimizationParametersIncorrectOrMissingColumnHeaderWarning(
                "test-files/additional-sheet-test-files/optimization-parameters-missing-header.xlsx",
                1,
                "optimization_parameters"
            );
        });
    });

    describe("workbooks with only a network or network_optimized_weights tab", function () {
        it("loads a workbook with only a network_optimized_weights sheet without fatal error", function () {
            test.loadsWithoutFatalError(
                "test-files/additional-sheet-test-files/3-genes_6-edges_network_optimized_weights-sheet-only.xlsx"
            );
        });

        it("loads a workbook with only a network sheet without fatal error", function () {
            test.loadsWithoutFatalError(
                "test-files/additional-sheet-test-files/3-genes_6-edges_network-sheet-only.xlsx"
            );
        });
    });
});
