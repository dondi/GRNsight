// Spreadsheet controller for converting entire GRNmap workbook (input or output) to JSON (#241)
var xlsx = require("node-xlsx");

var outputWorkbookPath = "../../test-files/spreadsheet-controller-test-files/" +
  "15-genes_28-edges_db5-MO-LK_Sigmoid_estimation_missing-values_output.xlsx";

var parseSheet = function (workbook) {
    var output = {};
    var TWO_COL_SHEET_NAMES = {"production_rates": true,
        "degradation_rates": true,
        "threshold_b": true,
        "optimized_production_rates": true,
        "optimized_threshold_b": true
    };

    // First, extract meta data from optimization_parameters

    // Parse two column format sheets
    for (var i = 0; i < workbook.length; i++) {
        var sheet = workbook[i];
        if (sheet.name in TWO_COL_SHEET_NAMES) {
            var data = {};
            sheet.data.forEach(function (element, index) {
                if (index !== 0) {
                    data[element[0]] = element[1];
                }
            });
            output[sheet.name] = data;
        }
    }
    return output;
};

var workbook = xlsx.parse(outputWorkbookPath);
var data = parseSheet(workbook);
console.log(data);
// console.log(JSON.stringify(data));

// Example JSON extraction
var data = {
    // Current data structure returned from spreadsheet parsing
    "network": {
        genes: [],
        links: [],
        errors: [],
        warnings: [],
        negativeWeights: [],
        positiveWeights: [],
        sheetType: "weighted"
    },
    // Additional data from spreadsheet of type "2-column" or "expression"
    "production_rates": { // Example JSON extraction of "2-column" type sheet
        "ACE2": 0.2236,
        "ASH1": 0.4332,
        "CIN5": 0.2009,
    },
    "expression": { // There are 3 types: "log2_expression", "log2_optimized_expression", and "sigmas"
        "wt_log2_expression": [ // Example JSON extraction of "log2_expression" type sheet
            {
                id: "ACE2",
                data: [
                  {"15": [0.6139, -1.0689, 0.1906, -0.398]},
                  {"30": [0.5827, -0.3947, -0.6264]},
                  {"60": [0.817, 0.5566, -0.4357, -1.2497]}
                ]
            },
            {
                id: "ASH1",
                data: [
                  {"15": [0.97, 0.3043, -0.9904, 0.2636]},
                  {"30": [0.382, 0.4206, -0.4911, -0.1284]},
                  {"60": [0.817, 0.5566, -0.4357, -1.2497]}
                ]
            },
        ],
        "dcln5_log2_expression": [
            {
                id: "ACE2",
                data: [
                  {"15": [0.6139, -1.0689, 0.1906, -0.398]},
                  {"30": [0.5827, -0.3947, -0.6264]},
                  {"60": [0.817, 0.5566, -0.4357, -1.2497]}
                ]
            },
            {
                id: "ASH1",
                data: [
                {"15": [0.97, 0.3043, -0.9904, 0.2636]},
                {"30": [0.382, 0.4206, -0.4911, -0.1284]},
                {"60": [0.817, 0.5566, -0.4357, -1.2497]}
                ]
            },
        ]
    }
};
