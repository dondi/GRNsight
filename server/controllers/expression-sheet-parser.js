// Parses "optimization_paramters," expression data sheets, and 2-column sheets
// from GRNmap input or output workbook

var EXPRESSION_SHEET_SUFFIXES = ["_expression", "_optimized_expression", "_sigmas"];
var spreadsheetController = require(__dirname + "/spreadsheet-controller");

var addExpWarning = function (network, message) {
    var warningsCount = network.warnings.length;
    var MAX_WARNINGS = 75;
    if (warningsCount < MAX_WARNINGS) {
        network.warnings.push(message);
    } else {
        network.errors.push(errorList.warningsCountError);
        return false;
    }
};

var addExpError = function (network, message) {
    var errorsCount = network.errors.length;
    var MAX_ERRORS = 20;
    if (errorsCount < MAX_ERRORS) {
        network.errors.push(message);
    } else {
        network.errors.push(errorList.errorsCountError);
        return false;
    }
};

var errorsList = {
    idLabelError: function () {
        return {
            errorCode: "MISLABELED_ID_CELL",
            errorDescription: "The top left cell of the expression sheet must contain \'id\' exactly."
        };
    },
    missingColumnHeaderError: function () {
        return {
            errorCode: "MISSING_COLUMN_HEADER",
            errorDescription: "All columns in expression sheet must have a header or label."
        };
    },
};

var warningsList = {
    missingExpressionWarning: function () {
        return {
            warningCode: "MISSING_EXPRESSION_SHEET",
            errorDescription: "_log2_expression or _log2_optimized_expression worksheet was not detected. The network graph will display without node coloring."
        };
    },
    extraneousDataWarning: function () {
        return {
            warningCode: "EXTRANEOUS_DATA",
            errorDescription: "There is extraneous data outside of the set rows and columns of the expression sheet."
        };        
    }
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

    // CHECK FOR MISSING EXPRESSION SHEET
    var expCount = 0;
    sheet.forEach(function (innerSheet) {
        if (isExpressionSheet(innerSheet)) {
            expCount++;
        }
    })
    if (expCount <= 0) {
        addExpWarning(expressionData, warningsList.missingExpressionWarning());
    }

    // Check that id label is correct
    var idLabel = sheet[0].data[0][0];
    if(idLabel !== 'id') {
        addExpError(expressionData, errorsList.idLabelError());
    }

    expressionData["time_points"] = sheet[0].data[0].slice(1);
    var numberOfDataPoints = expressionData["time_points"].length;
    var geneNames = [];
    sheet[0].data.forEach(function (sheet) {
        var geneName = sheet[0];
        if (geneName) {
            geneNames.push(geneName)
            var rowData = sheet.slice(1);
            // Sometimes, missing data is at the end of the row. In this case, pad the
            // array with nulls
            if (rowData.length < numberOfDataPoints) {
                fillArray(null, rowData, numberOfDataPoints);
            }
            geneData[geneName] = rowData;
        }
    });
    geneNames = geneNames.slice(1);
    expressionData["data"] = geneData;
    // May need to be updated...b/c we still want to populate the warnings/errors lists
    // if the 'id' cell is mislabeled.
    if (expressionData["data"]["id"]) {
        // Throw warning in case of extraneous data
        var rowLength = expressionData["data"]["id"].length;
        Object.values(expressionData["data"]).forEach(function(row) {
            if (row.length !== rowLength) {
                addExpWarning(expressionData, warningsList.extraneousDataWarning());
            }
        });

        // Throw error in case of missing column header
        var nonemptyValues = 0;
        expressionData["data"]["id"].forEach(function(value){
            nonemptyValues++;
        })
        if(rowLength !== nonemptyValues) {
            addExpError(expressionData, errorsList.missingColumnHeaderError());
        }
    }

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