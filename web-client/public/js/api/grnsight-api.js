import {responseCustomWorkbookData} from "../setup-load-and-import-handlers";
// General DB Access Functions
const buildQueryURL = function (path, parameters) {
    const searchParams = new URLSearchParams("");
    for (let p in parameters) {
        searchParams.append(p, parameters[p]);
    }
    return `${path}?${searchParams.toString()}`;
};

const responseData = (database, formData, queryURL) => {
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
            ).done((data) => {
                resolve(data);
            }).error( function () {
                console.log(`Error in accessing ${database} database. Result may just be loading.`);
            });
    });
};


// Expression DB Access Functions

const queryExpressionDatabase = (query) => {
    const queryURL = buildQueryURL("expressiondb", query);
    return responseData("expression", "", queryURL);
};

// Network DB Access Functions


const queryNetworkDatabase = (query) => {
    const queryURL = buildQueryURL("networkdb", query);
    return responseData("network", "", queryURL);
};

// Upload Custom Workbook Functions

const uploadCustomWorkbook = (workbook, grnState) => {
    const queryURL = buildQueryURL("upload-custom-workbook", workbook);
    return responseCustomWorkbookData(grnState, queryURL, workbook.name);
};


export { queryExpressionDatabase, queryNetworkDatabase, uploadCustomWorkbook };
