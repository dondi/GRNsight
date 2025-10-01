import { responseCustomWorkbookData } from "../setup-load-and-import-handlers";
// General DB Access Functions
const buildQueryURL = function (path, parameters) {
    const searchParams = new URLSearchParams("");
    for (let p in parameters) {
        searchParams.append(p, parameters[p]);
    }
    return `${path}?${searchParams}`;
};

const responseData = (database, formData, queryURL) => {
    return new Promise(function (resolve) {
        const uploadRoute = queryURL;
        const fullUrl = [$(".service-root").val(), uploadRoute].join("/");
        (formData
            ? $.ajax({
                  url: fullUrl,
                  data: formData,
                  processData: false,
                  contentType: false,
                  type: "GET",
                  crossDomain: true,
              })
            : $.getJSON(fullUrl)
        )
            .done(data => {
                resolve(data);
            })
            .error(() => {
                console.log(`Error in accessing ${database} database. Result may just be loading.`);
            });
    });
};

// Expression DB Access Functions

const queryExpressionDatabase = query => {
    const queryURL = buildQueryURL("expressiondb", query);
    return responseData("expression", "", queryURL);
};

// Network DB Access Functions

const queryNetworkDatabase = query => {
    const queryURL = buildQueryURL("networkdb", query);
    return responseData("network", "", queryURL);
};

// GRNsettings DB Access Functions

const queryDefaultDataset = query => {
    const queryURL = buildQueryURL("grnsettingsdb", query);
    return responseData("grnsettings", "", queryURL);
};

// Protein-Protein DB Access Functions

const queryProteinProteinDatabase = query => {
    const queryURL = buildQueryURL("proteindb", query);
    return responseData("network", "", queryURL);
};

// Upload Custom Workbook Functions

const uploadCustomWorkbook = (workbook, grnState) => {
    const queryURL = buildQueryURL("upload-custom-workbook", workbook);
    return responseCustomWorkbookData(grnState, queryURL, workbook.name);
};

const constructFullUrl = queryURL => [$(".service-root").val(), queryURL].join("/");

const getWorkbookFromForm = (formData, queryURL) => {
    const fullUrl = constructFullUrl(queryURL);

    // The presence of formData is taken to indicate a POST.
    return formData
        ? $.ajax({
              url: fullUrl,
              data: formData,
              processData: false,
              contentType: false,
              type: "POST",
              crossDomain: true,
          })
        : $.getJSON(fullUrl);
};

const getWorkbookFromUrl = queryURL => {
    const fullUrl = constructFullUrl(queryURL);
    return $.getJSON(fullUrl);
};

export {
    queryExpressionDatabase,
    queryNetworkDatabase,
    uploadCustomWorkbook,
    getWorkbookFromForm,
    getWorkbookFromUrl,
    queryDefaultDataset,
    queryProteinProteinDatabase,
};
