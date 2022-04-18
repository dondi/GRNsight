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
        const fullUrl = [ $(".service-root").val(), uploadRoute ].join("/");
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

const queryExpressionDatabase = (query) => {
    let queryURL = buildExpressionURL({dataset: query.dataset}, query.genes);
    return responseExpressionData("", queryURL);
};

// Network DB Access Functions

const buildNetworkGenesQuery = (genes) => {
    let result = ""
    for (let gene in genes) {
        result += `${genes[gene]},`
    }
    return result.substring(0, result.length - 1);
}

const buildNetworkURL = function (queryType, queryInfo) {
    let baseQuery = `networkdb?type=${queryType}`;
    if (queryInfo !== null) {
        for (let header in queryInfo){
            if (header === "genes") {
                baseQuery += `&${header}=${buildNetworkGenesQuery(queryInfo[header])}`
            } else {
            baseQuery += `&${header}=${queryInfo[header]}`
            }
        }
    }
    return baseQuery;
};

const responseNetworkData = (formData, queryURL) => {
    return new Promise(function (resolve) {
        const uploadRoute = queryURL;
        const fullUrl = [ $(".service-root").val(), uploadRoute ].join("/");
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
            ).done((networkData) => {
                resolve(networkData);
            }).error(console.log("Error in accessing network database. Result may just be loading."));
    });
};

const queryNetworkDatabase = (query) => {
    let queryURL = buildNetworkURL(query.type, query.info);
    console.log(queryURL)
    return responseNetworkData("", queryURL);
};


export {queryExpressionDatabase, queryNetworkDatabase};