// Parses "optimization_paramters," expression data sheets, and 2-column sheets
// from GRNmap input or output workbook

var EXPRESSION_SHEET_SUFFIXES = ["_expression", "_optimized_expression", "_sigmas"];
var spreadsheetController = require(__dirname + "/spreadsheet-controller");

var addExpWarning = function (network, message) {
    if (typeof network.warnings === 'undefined') {
        network["warnings"] = []
    }
    var warningsCount = network.warnings.length;
    var MAX_WARNINGS = 75;
    if (warningsCount < MAX_WARNINGS) {
        network.warnings.push(message);
    } else {
        network.errors.push(errorList.warningsCountError);
        return false;
    }
};

var warningsList = {
    missingExpressionWarning: function () {
        return {
            warningCode: "MISSING_EXPRESSION_SHEET",
            errorDescription: "_log2_expression or _log2_optimized_expression worksheet was not detected. The network graph will display without node coloring."
        };
    },

    // missingTargetGeneWarning: function (row, column) {
    //     var colLetter = numbersToLetters[column];
    //     var rowNum = row + 1;
    //     return {
    //         warningCode: "MISSING_TARGET",
    //         errorDescription: "A target gene name is missing in cell " + colLetter + rowNum + "."
    //     };
    // },

    // invalidMatrixDataWarning: function (row, column) {
    //     var colLetter = numbersToLetters[column];
    //     var rowNum = row + 1;
    //     return {
    //         warningCode: "INVALID_DATA",
    //         errorDescription: "The value in cell " + colLetter + rowNum + ", is undefined."
    //     };
    // },

    // randomDataWarning: function (type, row, column) {
    //     var colLetter = numbersToLetters[column];
    //     var rowNum = row + 1;
    //     return {
    //         warningCode: "RANDOM_DATA",
    //         errorDescription: "The value in cell " + colLetter + rowNum +
    //         ", has a corresponding source and/or target gene that is detected as " + type + "."
    //     };
    // },

    // emptyRowWarning: function (row) {
    //     var rowNum = row + 1;
    //     return {
    //         warningCode: "EMPTY_ROW",
    //         errorDescription: "Row " + rowNum + " was found to contain no data."
    //     };
    // },

    // networkSizeWarning: function (genesLength, edgesLength) {
    //     return {
    //         warningCode: "INVALID_NETWORK_SIZE",
    //         errorDescription: "Your network has " + genesLength + " genes, and " + edgesLength +
    //         " edges. Please note that networks are recommended to have less than 50 genes and 100 edges."
    //     };
    // },

    // incorrectlyNamedSheetWarning: function () {
    //     return {
    //         warningCode: "INCORRECTLY_NAMED_SHEET",
    //         errorDescription: "The uploaded file appears to contain a weighted network, but contains no \
    //          'network_optimized_weights' sheet. A weighted network must be contained in a sheet called \
    //          'network_optimized_weights' in order to be drawn as a weighted graph. \
    //          Please check if the sheet(s) in the uploaded spreadsheet have been named properly."
    //     };
    // },

    // missingNetworkWarning: function () {
    //     return {
    //         warningCode: "MISSING_EXPRESSION_SHEET",
    //         errorDescription: "The file you uploaded contains no expression data sheet. This is not required, \
    //          but there may be errors in the way the nodes are colored without this data present."
    //     };
    // }

};

var fillArray = function (value, array, length) { // mutator
    while (array.length < length) {
        array.push(value);
    }
    return array;
};

var isExpressionSheet = function (sheetName) {
    return EXPRESSION_SHEET_SUFFIXES.some(function (suffix) {
        return sheetName.name.includes(suffix);
    });
};

// Going to continue basing this section off of the parseSheet function in spreadsheet-controller.js
var parseExpressionSheet = function (sheet) {
    // TRY PUTTING WARNING STUFF HERE
    var geneData = {};
    var expressionData = {
        genes: [],
        links: [],
        errors: [],
        warnings: [],
        positiveWeights: [],
        negativeWeights: [],
        sheetType: "unweighted",
        time_points: []
    };
    var expCount = 0;
    sheet.forEach(function (innerSheet) {
        if (isExpressionSheet(innerSheet)) {
            expCount++;
        }
    })
    if (expCount <= 0) {
        addExpWarning(expressionData, warningsList.missingExpressionWarning());
    }
    expressionData["time_points"] = sheet[0].data[0].slice(1);
    var numberOfDataPoints = expressionData["time_points"].length;
    sheet[0].data.forEach(function (sheet) {
        var geneName = sheet[0];
        if (geneName) {
            var rowData = sheet.slice(1);
            // Sometimes, missing data is at the end of the row. In this case, pad the
            // array with nulls
            if (rowData.length < numberOfDataPoints) {
                fillArray(null, rowData, numberOfDataPoints);
            }
            geneData[geneName] = rowData;
        }
    });
    expressionData["data"] = geneData;


    return expressionData;
};

// This should return an object that has this function in it
// module.exports = function (sheet) {
//     var output = {
//         expression: {} // expression data
//     };
//     sheet.forEach(function (sheet) {
//         if (isExpressionSheet(sheet.name)) {
//             output["expression"][sheet.name] = parseExpressionSheet(sheet);
//         }
//     });
//     // First try adding in a warning message. Is this a good place to do warning/error checks?
//     if (output["expression"] === null) {
//         addWarning(output["expression"], warningsList.missingExpressionWarning);
//     }
//     // return output;
//     return {
//         parseExpressionSheet: parseExpressionSheet
//     };
// };

module.exports = function (app) {
    if (app) {

    // parse the incoming form data, then parse the spreadsheet. Finally, send back json.
        app.post("/upload", function (req, res) {
      // TODO: Add file validation (make sure that file is an Excel file)
            (new multiparty.Form()).parse(req, function (err, fields, files) {
                if (err) {
                    return res.json(400, "There was a problem uploading your file. Please try again.");
                }
                var input;
                try {
                    input = files.file[0].path;
                } catch (err) {
                    return res.json(400, "No upload file selected.");
                }

                if (path.extname(input) !== ".xlsx") {
                    return res.json(400, "This file cannot be loaded because:<br><br> The file is \
                        not in a format GRNsight can read." + "<br>Please select an Excel Workbook \
                        (.xlsx) file. Note that Excel 97-2003 Workbook (.xls) files are not " +
                        " able to be read by GRNsight. <br><br>SIF and GraphML files can be loaded \
                        using the importer under File > Import." + " Additional information about file \
                        types that GRNsight supports is in the Documentation.");
                }

                return processGRNmap(input, res, app);
            });
        });
    }

    // exporting parseSheet for use in testing. Do not remove!
    return {
        parseExpressionSheet: parseExpressionSheet,
    };
};