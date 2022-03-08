// Expression DB Access Functions
const buildExpressionTimepointsString = function (selection) {
    let timepoints = "";
    selection.timepoints.forEach(x => timepoints += (x + ","));
    return timepoints.substring(0, timepoints.length - 1);
};
const buildExpressionGeneQuery = function (workbookGenes) {
    let genes = "";
    workbookGenes.forEach(x => genes += (x.name + ","));
    return genes.substring(0, genes.length - 1);
};

const buildExpressionURL = function (selection, genes) {
    const baseQuery = `expressiondb?dataset=${selection.dataset}&genes=${buildExpressionGeneQuery(genes)}`;
    return selection.timepoints ?
    `${baseQuery}&timepoints=${buildExpressionTimepointsString(selection)}` :
    baseQuery;
};

const responseExpressionData = (formData, queryURL) => {
    return new Promise(function (resolve) {
        const uploadRoute = queryURL;
        const fullUrl = [ $("#service-root").val(), uploadRoute ].join("/");
        (formData ?
            $.ajax({
                url: fullUrl,
                data: formData,
                processData: false,
                contentType: false,
                type: "GET",
                crossDomain: true
            }) :
            $.getJSON(fullUrl)
            ).done((expressionData) => {
                resolve(expressionData);
            }).error(console.log("Error in accessing expression database. Result may just be loading."));
    });
};

export const queryExpressionDatabase = (query) => {
    let queryURL = buildExpressionURL({dataset: query.dataset}, query.genes);
    return responseExpressionData("", queryURL);
};