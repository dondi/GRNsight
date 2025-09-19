"use strict";

// Using "use strict" global
const serviceRoot = $(".service-root").attr("value");
const serializer = new XMLSerializer();
const XMLParser = function (data) {
    return serializer.serializeToString(data).replace(/\<.*?\>\s?/g, "");
};
// console.log("service root: " + serviceRoot)

let defaultJaspar = {
    jasparID: "Not found",
    class: "Not found",
    family: "Not found",
    sequenceLogo: "Not found",
    frequencyMatrix: "Not found",
};

let defaultNCBI = {
    ncbiID: "Not found",
    locusTag: "Not found",
    genomicSequence: "Not found",
};

let defaultUniprot = {
    uniprotID: "Not found",
    proteinSequence: "Not found",
    proteinType: "Not found",
    species: "Species not found",
};

let defaultGeneOntology = {
    molecularFunction: "Not found",
    biologicalProcess: "Not found",
    cellularComponent: "Not found",
};

let defaultRegulators = {
    regulators: "Not found",
    targets: "Not found",
};

let defaultYeastmine = {
    description: "Not found",
    sgdID: "Not found",
    geneOntologySummary: "Not found",
};

let getUniProtInfo = function (query) {
    const taxon = query.uniprot;
    const geneSymbol = query.symbol;
    // console.log("this is uniprot: " + taxon);
    return $.get({
        url: serviceRoot + "/uniprot/uploadlists/",
        data: {
            from: "GENENAME",
            to: "ACC",
            format: "tab",
            taxon: taxon,
            query: geneSymbol,
        },
        dataType: "text",
        timeout: 5000,
    }).then(function (data) {
        const regex = new RegExp(geneSymbol + "[ \t\r\n\v\f]*([A-Z0-9]+)", "gm");
        const id = regex.exec(data)[1];
        return $.get({
            url: serviceRoot + "/uniprot/uniprot/" + id + ".xml",
            timeout: 5000,
        });
    });
};

let getNCBIInfo = function (query) {
    const geneSymbol = query.symbol;
    const geneName = query.species.replace(/_/, "+");
    // console.log("calling ncbi")

    return $.get({
        url: serviceRoot + "/ncbi/entrez/eutils/esearch.fcgi",
        data: {
            db: "gene",
            term: geneSymbol + "[gene]+" + geneName + "[Organism]",
        },
        dataType: "text",
        timeout: 5000,
    }).then(function (data) {
        const regex = /<Id>(\d*)<\/Id>/gm;
        const id = regex.exec(data)[1];
        return $.get({
            url: serviceRoot + "/ncbi/entrez/eutils/esummary.fcgi?db=gene&id=" + id,
            dataType: "xml",
            timeout: 5000,
        });
    });
};

let getGeneOntologyInfo = function (query) {
    const geneSymbol = query.symbol;
    return $.get({
        url: serviceRoot + "/yeastmine/backend/locus/" + geneSymbol + "/go_details",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("content-type", "application/json");
        },
    }).catch(function () {
        return defaultGeneOntology;
    });
};

let getRegulationInfo = function (query) {
    const geneSymbol = query.symbol;
    return $.get({
        url: serviceRoot + "/yeastmine/backend/locus/" + geneSymbol + "/regulation_details",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("content-type", "application/json");
        },
    });
};

// let getFlyMineInfo = function (query) {
//     const geneSymbol = query.symbol;
//     return $.get({
//         url: serviceRoot + "/flymine/webservice/locus/" + geneSymbol,
//         dataType: "json",
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader("content-type", "application/json");
//         },
//     });
// };

let getYeastMineInfo = function (query) {
    const geneSymbol = query.symbol;
    return $.get({
        url: serviceRoot + "/yeastmine/webservice/locus/" + geneSymbol,
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("content-type", "application/json");
        },
    });
};

let getJasparInfo = function (query) {
    const geneSymbol = query.symbol;
    const taxon = query.jaspar;
    // console.log("this is jaspar: " + taxon);

    return $.get({
        url:
            serviceRoot +
            "/jaspar/api/v1/matrix/?tax_id=" +
            taxon +
            "&format=json&name=" +
            geneSymbol.toUpperCase(),
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("content-type", "application/json");
        },
        timeout: 5000,
    }).then(function (data) {
        return data.results.length === 0 || data.results === undefined
            ? {}
            : $.get({
                  url: serviceRoot + "/jaspar/api/v1/matrix/" + data.results[0].matrix_id,
                  dataType: "json",
                  beforeSend: function (xhr) {
                      xhr.setRequestHeader("content-type", "application/json");
                  },
              });
    });
};

let defaultValues = {
    jaspar: defaultJaspar,
    ncbi: defaultNCBI,
    uniprot: defaultUniprot,
    sgd: defaultYeastmine,
    geneOntology: defaultGeneOntology,
    regulators: defaultRegulators,
};

let parseRegulators = function (data, symbol) {
    let regs = [];
    let targs = [];

    data.filter(word =>
        word.locus1.display_name === symbol.symbol
            ? (targs[targs.length] = {
                  target: word.locus2.display_name,
                  regulationOf: word.regulation_of,
              })
            : (regs[regs.length] = {
                  regulator: word.locus1.display_name,
                  regulationOf: word.regulation_of,
                  regulationType: word.regulation_type,
              })
    );

    return {
        regulators: regs,
        targets: targs,
    };
};

let parseGeneOntology = function (data) {
    let goTemplate = {
        molecularFunction: [],
        biologicalProcess: [],
        cellularComponent: [],
    };

    for (var k = 0; k < data.length; k++) {
        let isUnique = true;
        for (var len = 0; len < k; len++) {
            if (data[k].go.go_id === data[len].go.go_id) {
                isUnique = false;
            }
        }

        if (isUnique) {
            switch (data[k].go.go_aspect) {
                case "molecular function":
                    goTemplate.molecularFunction[goTemplate.molecularFunction.length] = {
                        id: data[k].go.go_id,
                        link: data[k].go.link,
                        displayName: data[k].go.display_name,
                    };
                    break;
                case "biological process":
                    goTemplate.biologicalProcess[goTemplate.biologicalProcess.length] = {
                        id: data[k].go.go_id,
                        link: data[k].go.link,
                        displayName: data[k].go.display_name,
                    };
                    break;
                case "cellular component":
                    goTemplate.cellularComponent[goTemplate.cellularComponent.length] = {
                        id: data[k].go.go_id,
                        link: data[k].go.link,
                        displayName: data[k].go.display_name,
                    };
                    break;
            }
        }
    }

    for (var prop in goTemplate) {
        if (goTemplate[prop].length === 0) {
            goTemplate[prop] = "Not found";
        }
    }

    return goTemplate;
};

let parseUniprot = function (data) {
    let uniprotTemplate = {
        uniprotID: XMLParser(data.getElementsByTagName("name")[0]),
        proteinSequence: XMLParser(data.getElementsByTagName("sequence")[0]),
        proteinType: XMLParser(data.getElementsByTagName("protein")[0].childNodes[1].childNodes[1]),
        species: XMLParser(data.getElementsByTagName("organism")[0].childNodes[1]),
    };

    for (var prop in uniprotTemplate) {
        if (uniprotTemplate[prop] === undefined || uniprotTemplate[prop] === null) {
            uniprotTemplate[prop] = "Not found";
        }
    }

    return uniprotTemplate;
};

let parseNCBI = function (data) {
    const tagArray = serializer
        .serializeToString(data.getElementsByTagName("OtherAliases")[0])
        .split(",");
    const ncbiTemplate = {
        ncbiID: data.getElementsByTagName("DocumentSummary")[0].getAttribute("uid"),
        locusTag: tagArray[0].replace(/\<.*?\>\s?/g, ""),
        chromosomeSequence: XMLParser(data.getElementsByTagName("ChrAccVer")[0]),
    };

    for (var prop in ncbiTemplate) {
        if (ncbiTemplate[prop] === undefined || ncbiTemplate[prop] === null) {
            ncbiTemplate[prop] = "Not found";
        }
    }

    return ncbiTemplate;
};

let parseYeastmine = function (data) {
    const yeastmineTemplate = {
        description: data.description,
        sgdID: data.sgdid,
        geneOntologySummary: data.go_overview.paragraph,
    };

    for (var prop in yeastmineTemplate) {
        if (yeastmineTemplate[prop] === undefined || yeastmineTemplate[prop] === null) {
            yeastmineTemplate[prop] = "Not found";
        }
    }

    return yeastmineTemplate;
};

// let parseFlymine = function (data) {
//     const flymineTemplate = {
//         description: data.description,
//         sgdID: data.sgdid,
//         geneOntologySummary: data.go_overview.paragraph,
//     };

//     for (var prop in flymineTemplate) {

//         if ((flymineTemplate[prop] === undefined) || (flymineTemplate[prop] === null)) {
//             flymineTemplate[prop] = "Not found";
//         }
//     }

//     return flymineTemplate;
// };

let parseJaspar = function (data) {
    // console.log(data)
    const jasparTemplate = {
        jasparID: data.matrix_id,
        class: data.class[0],
        family: data.family[0],
        sequenceLogo: data.sequence_logo,
        frequencyMatrix: data.pfm,
    };

    for (var prop in jasparTemplate) {
        if (jasparTemplate[prop] === undefined || jasparTemplate[prop] === null) {
            jasparTemplate[prop] = "Not found";
        }
    }

    return jasparTemplate;
};

(function ($) {
    window.api = {
        getNCBIInfo,
        getUniProtInfo,
        getYeastMineInfo,
        // getFlyMineInfo,
        getGeneOntologyInfo,
        getRegulationInfo,
        getJasparInfo,
        getGeneInformation: function (symbol) {
            return $.when(window.api.getNCBIInfo(symbol))
                .then(function (ncbiInfo) {
                    defaultValues.ncbi = parseNCBI(ncbiInfo);
                    return window.api.getUniProtInfo(symbol);
                })
                .then(function (uniProtInfo) {
                    //    console.log("in uniprot")
                    defaultValues.uniprot = parseUniprot(uniProtInfo);
                    return window.api.getJasparInfo(symbol);
                })
                .then(function (jasparInfo) {
                    //    console.log("this is jasparInfo: ")
                    //    console.log(jasparInfo)
                    defaultValues.jaspar = parseJaspar(jasparInfo);
                    return window.api.getYeastMineInfo(symbol);
                })
                .then(function (yeastMineInfo) {
                    //    console.log("in yeastmine")
                    defaultValues.sgd = parseYeastmine(yeastMineInfo);
                    //    return window.api.getFlyMineInfo(symbol);
                    //    }).then(function (flyMineInfo) {
                    //    defaultValues.sgd = parseFlymine(flyMineInfo);
                    return window.api.getGeneOntologyInfo(symbol);
                })
                .then(function (goInfo) {
                    //    console.log("inside GO call")
                    defaultValues.geneOntology = parseGeneOntology(goInfo);
                    return window.api.getRegulationInfo(symbol);
                })
                .then(function (regulationInfo) {
                    // parseRegulators needs both info and symbol
                    defaultValues.regulators = parseRegulators(regulationInfo, symbol);
                    return defaultValues;
                })
                .catch(function () {
                    //    window.api.getNCBIInfo(symbol);
                    window.api.getUniProtInfo(symbol);
                    window.api.getYeastMineInfo(symbol);
                    //    window.api.getFlyMineInfo(symbol);
                    window.api.getGeneOntologyInfo(symbol);
                    window.api.getRegulationInfo(symbol);
                    window.api.getJasparInfo(symbol);
                    window.api.getNCBIInfo(symbol);

                    if (
                        defaultValues.ncbi === defaultNCBI &&
                        defaultValues.uniprot === defaultUniprot &&
                        defaultValues.sgd === defaultYeastmine &&
                        defaultValues.geneOntology === defaultGeneOntology &&
                        defaultValues.regulators === defaultRegulators &&
                        defaultValues.jaspar === defaultJaspar
                    ) {
                        const errorString1 =
                            "No gene information was retrieved for " + symbol.symbol + ".";

                        const errorString2 = "This could have happened because:";
                        const errorString3 =
                            "You can check back later to see if gene information" +
                            " can be retrieved or submit an issue to https://github.com/dondi/GRNsight.";

                        $("#error2").text(errorString2);
                        var errorString4 = $("<ul/>").appendTo("#error2");
                        errorString4.append("<li>The wrong species is selected </li>");
                        errorString4.append(
                            "<li>GRNsight could not access the gene information" +
                                " from one of the source databases</li>"
                        );
                        errorString4.append(
                            "<li>No information exists for the gene in the source databases.</li>"
                        );

                        $("#error1").text(errorString1);
                        $("#error3").text(errorString3);

                        var screenHeight = $(window).height();
                        var MIN_SCREEN_HEIGHT = 600;
                        var BORDER = 425;
                        var setPanel = screenHeight - BORDER + "px";
                        var minPanel = MIN_SCREEN_HEIGHT - BORDER + "px";
                        if (screenHeight > MIN_SCREEN_HEIGHT) {
                            $("#list-frame").css({ height: setPanel, overflow: "auto" });
                        } else {
                            $("#list-frame").css({ height: minPanel, overflow: "auto" });
                        }

                        $("#errorModal").css({
                            "font-family": "arial",
                            "font-size": "14px",
                            color: "#333",
                        });
                        $("#errorModal").modal("show");
                    }

                    return defaultValues;
                });
        },
    };
})($);
