// Parses "optimization_paramters" and 2-column sheets
// from GRNmap input or output workbook

const TWO_COL_SHEET_NAMES = [
    "production_rates",
    "degradation_rates",
    "threshold_b",
    "optimized_production_rates",
    "optimized_threshold_b"
];

const parseMetaDataSheet = (sheet) => {
    let meta = {};
    sheet.data.forEach(function (element, index) {
        if (index !== 0) {
            const value = element.slice(1);
            // Extract element from array if array contains only 1 value
            meta.element[0] = value.length > 1 ? value : value[0];
        }
    });
    return meta;
};

const parseTwoColumnSheet = (sheet) => {
    let data = {};
    sheet.data.forEach(function (element, index) {
        if (index !== 0) {
            data[element[0]] = element[1];
        }
    });
    return data;
};

module.exports = function (workbook) {
    let output = {
        meta: {},
        test: {} // 2-column data
    };
    workbook.forEach(function (sheet) {
        if (sheet.name === "optimization_parameters") {
            output.meta = parseMetaDataSheet(sheet);
        // Parse 2-column sheets
        } else if (TWO_COL_SHEET_NAMES.includes(sheet.name)) {
            output["test"][sheet.name] = parseTwoColumnSheet(sheet);
        }
    });
    return output;
};
