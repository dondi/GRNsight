var assert = require("chai").assert;
var xlsx = require("node-xlsx");
var parseAdditionalSheets = require(__dirname + "/../server/controllers/additional-sheet-parser");
var grnmapOutputWorkbookPath = __dirname + "/../test-files/spreadsheet-controller-test-files/" +
  "15-genes_28-edges_db5-MO-LK_Sigmoid_estimation_missing-values_output.xlsx";
var grnmapInputWorkbookPath = __dirname + "/../test-files/spreadsheet-controller-test-files/" +
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
        var workbook = xlsx.parse(__dirname + "/../test-files/spreadsheet-controller-test-files/" +
        "log2_expression_with_missing_data.xlsx");
        var data = parseAdditionalSheets(workbook);
        assert(data,
            {"expression": {
                "wt_log2_expression": {
                    "time_points": [15, 15, 15, 15, 30, 30, 30, 30, 30, 60, 60, 60, 60],
                    "data": {
                        "ACE2":[0.6139, -1.0689, 0.1906, -0.398, 0.5827, null,
                            -0.3947, -0.6264, 0.3377, 0.817, 0.5566, -0.4357, -1.2497],
                        "ASH1":[0.97, 0.3043, -0.9904, -0.2636, -0.382, 0.4206, -0.4911,
                            -0.1284, -0.7236, -1.3477, -1.0468, -1.0978, -0.9248],
                        "ZAP1":[0.6594, 0.6135, 0.3238, -0.3712, 1.4712, 1.9049, 0.599,
                            -0.2354, -0.394, 2.9606, 3.5569, 1.3863, null]
                    }
                }
            },
                "meta":{},
                "test":{}
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

    it("correctly parses optimization_parameters sheet", function () {
        var workbook = xlsx.parse(__dirname + "/../test-files/spreadsheet-controller-test-files/" +
        "optimization_parameters_test.xlsx");
        var data = parseAdditionalSheets(workbook);
        /* eslint-disable */
        assert(data.meta, {
            alpha: 0.002,
            kk_max: 1,
            MaxIter: 100000000,
            TolFun: 0.000001,
            MaxFunEval: 100000000,
            TolX: 0.000001,
            production_function: 'Sigmoid',
            L_curve: 0,
            estimate_params: 1,
            make_graphs: 1,
            fix_P: 0,
            fix_b: 0,
            expression_timepoints: [ 15, 30, 60 ],
            Strain: [ 'wt', 'dcin5', 'dgln3', 'dhap4', 'dhmo1', 'dzap1' ],
            simulation_timepoints: [ 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60 ]
        });
        /* eslint-enable */
    });

    it("correctly parses data in a 2-column format", function () {
        var workbook = xlsx.parse(__dirname + "/../test-files/spreadsheet-controller-test-files/" +
        "2_column_data_format_test.xlsx");
        var data = parseAdditionalSheets(workbook);
        assert(data["test"]["degradation_rates"], {
            "ACE2": 0.1118,
            "ASH1": 0.2166,
            "CIN5": 0.1005,
            "GCR2": 0.0963
        });
    });
});
