"use strict";

// Using "use strict" global
const serviceRoot = $("#service-root").attr("value");
const serializer = new XMLSerializer();
const XMLParser = function (data) {
    return serializer.serializeToString(data).replace(/\<.*?\>\s?/g, "");
};


let defaultJaspar = {
    jasparID: "Not found",
    class: "Not found",
    family: "Not found",
    sequenceLogo: "Not found",
    frequencyMatrix: "Not found"
};

let defaultNCBI  = {
    ncbiID: "Not found",
    locusTag: "Not found",
    alsoKnownAs: "Not found",
    chromosomeSequence: "Not found",
    genomicSequence: "Not found"
};

let defaultUniprot = {
    uniprotID: "Not found",
    proteinSequence: "Not found",
    proteinType: "Not found",
    species: "Species not found"
};

let defaultEnsembl = {
    ensemblID:  "Not found",
    dnaSequence:  "Not found",
    geneLocation:  "Not found"
};

let defaultGeneOntology = {
    molecularFunction: "Not found",
    biologicalProcess: "Not found",
    cellularComponent: "Not found"
};

let defaultRegulators = {
    regulators: "Not found",
    targets: "Not found"
};

let defaultYeastmine = {
    description: "Not found",
    sgdID: "Not found",
    standardName: "Not found",
    systematicName: "Not found",
    totalInteractions: "Not found",
    affinityCaptureMS: "Not found",
    affinityCaptureRNA: "Not found",
    affinityCaptureWestern: "Not found",
    biochemicalActivity: "Not found",
    colocalization: "Not found",
    reconstitutedComplex: "Not found",
    twoHybrid: "Not found",
    dosageRescue: "Not found",
    negativeGenetic: "Not found",
    phenotypicEnhancement: "Not found",
    phenotypicSuppression: "Not found",
    syntheticGrowthDefect: "Not found",
    syntheticHaploinsufficiency: "Not found",
    syntheticLethality: "Not found",
    syntheticRescue: "Not found",
    geneOntologySummary: "Not found",
};

let getUniProtInfo = function (query) {
    const taxon = query.taxon;
    const geneSymbol = query.symbol;
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
    }).fail(function () {
        return $.get(this);
    });
};

let getNCBIInfo = function (query) {
    const geneSymbol = query.symbol;

    // unsure if this needs to be greedy for species with >2 words in their name
    const geneName = query.species.replace(/_/, "+");

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
        }
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
        }
    });
};

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

let getEnsemblInfo = function (query) {
    const geneSymbol = query.symbol;
    const geneSpecies = query.species;
    return $.get({
        url: serviceRoot + "/ensembl/lookup/symbol/" + geneSpecies + "/"
        + geneSymbol + "?content-type=application/json",
        dataType: "json",
        timeout: 5000
    });
};

let getJasparInfo = function (query) {
    const geneSymbol = query.symbol;

    // will eventually need to decide which taxon to use for JASPAR, for now this remains hardcoded
    const taxon = "4932";

    return $.get({
        url: serviceRoot + "/jaspar/api/v1/matrix/?tax_id=" + taxon + "&format=json&name=" + geneSymbol.toUpperCase(),
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("content-type", "application/json");
        },
    }).then(function (data) {
        return (data.results.length === 0 || data.results === undefined) ? {} :
            $.get({
                url: serviceRoot + "/jaspar/api/v1/matrix/" + data.results[0].matrix_id,
                dataType: "json",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("content-type", "application/json");
                },
            });
    });
};

let defaultValues = {
    jaspar:  defaultJaspar,
    ncbi: defaultNCBI,
    ensembl: defaultEnsembl,
    uniprot: defaultUniprot,
    sgd: defaultYeastmine,
    geneOntology: defaultGeneOntology,
    regulators: defaultRegulators
};


let parseRegulators = function (data, symbol) {
    let regulatorsTemplate = {
        regulators: [],
        targets: [],
    };

    for (var k = 0; k < data.length; k++) {
        switch (data[k].locus1.display_name) {
        case symbol:
            regulatorsTemplate.targets[regulatorsTemplate.targets.length] = {
                target: data[k].locus2.display_name,
                regulationOf: data[k].regulation_of,
            };
            break;
        default:
            regulatorsTemplate.regulators[regulatorsTemplate.regulators.length] = {
                regulator: data[k].locus1.display_name,
                regulationOf: data[k].regulation_of,
                regulationType: data[k].regulation_type,
            };
            break;
        }
    }


    return regulatorsTemplate;
};

let parseGeneOntology = function (data) {


    let goTemplate = {
        molecularFunction : [],
        biologicalProcess : [],
        cellularComponent : [],
    };

    for (var k = 0; k < data.length; k++) {
        let isUnique = true;
        for (var len = 0; len < k; len++) {
            if (data[k].go.go_id === data[len].go.go_id) {
                isUnique = false;
            }
        }

        if (isUnique) {
            switch (data[k].go.go_aspect ) {
            case "molecular function":
                goTemplate.molecularFunction[goTemplate.molecularFunction.length] = {
                    id: data[k].go.go_id,
                    link: data[k].go.link,
                    displayName: data[k].go.display_name
                };
                break;
            case "biological process":
                goTemplate.biologicalProcess[goTemplate.biologicalProcess.length] = {
                    id: data[k].go.go_id,
                    link: data[k].go.link,
                    displayName: data[k].go.display_name
                };
                break;
            case "cellular component":
                goTemplate.cellularComponent[goTemplate.cellularComponent.length] = {
                    id: data[k].go.go_id,
                    link: data[k].go.link,
                    displayName: data[k].go.display_name
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
        if ((uniprotTemplate[prop] === undefined) || (uniprotTemplate[prop] === null)) {
            uniprotTemplate[prop] = "Not found";
        }
    }

    return uniprotTemplate;

};

let parseNCBI = function (data) {
    const tagArray = serializer.serializeToString(
        data.getElementsByTagName("OtherAliases")[0]).split(",");
    const ncbiTemplate = {
        ncbiID: data.getElementsByTagName("DocumentSummary")[0].getAttribute("uid"),
        locusTag: tagArray[0].replace(/\<.*?\>\s?/g, ""),
        alsoKnownAs: tagArray.slice(1).join().replace(/\<.*?\>\s?/g, ""),
        chromosomeSequence: XMLParser(data.getElementsByTagName("ChrAccVer")[0]),
        genomicSequence: XMLParser(data.getElementsByTagName("ChrLoc")[0]) + "; "
        + XMLParser(data.getElementsByTagName("ChrAccVer")[0]) + " ("
        + XMLParser(data.getElementsByTagName("ChrStart")[0])
        + ".." + XMLParser(data.getElementsByTagName("ChrStop")[0]) + ")",
    };

    for (var prop in ncbiTemplate) {
        if ((ncbiTemplate[prop] === undefined) || (ncbiTemplate[prop] === null)) {
            ncbiTemplate[prop] = "Not found";
        }
    }

    return ncbiTemplate;
};

let parseYeastmine = function (data) {
    const yeastmineTemplate = {
        description: data.description,
        sgdID: data.sgdid,
        standardName: data.symbol,
        systematicName: data.gene_name,
        totalInteractions: "Not found", // Information unavailable via regular API
        affinityCaptureMS: "Not found", // Information unavailable via regular API
        affinityCaptureRNA: "Not found", // Information unavailable via regular API
        affinityCaptureWestern: "Not found", // Information unavailable via regular API
        biochemicalActivity: "Not found", // Information unavailable via regular API
        colocalization: "Not found", // Information unavailable via regular API
        reconstitutedComplex: "Not found", // Information unavailable via regular API
        twoHybrid: "Not found", // Information unavailable via regular API
        dosageRescue: "Not found", // Information unavailable via regular API
        negativeGenetic: "Not found", // Information unavailable via regular API
        phenotypicEnhancement: "Not found", // Information unavailable via regular API
        phenotypicSuppression: "Not found", // Information unavailable via regular API
        syntheticGrowthDefect: "Not found", // Information unavailable via regular API
        syntheticHaploinsufficiency: "Not found", // Information unavailable via regular API
        syntheticLethality: "Not found", // Information unavailable via regular API
        syntheticRescue: "Not found", // Information unavailable via regular API
        geneOntologySummary: data.go_overview.paragraph,
        molecularFunction: "Not found", // Information unavailable via regular API
        biologicalProcess: "Not found", // Information unavailable via regular API
        cellularComponent: "Not found", // Information unavailable via regular API
    };

    for (var prop in yeastmineTemplate) {

        if ((yeastmineTemplate[prop] === undefined) || (yeastmineTemplate[prop] === null)) {
            yeastmineTemplate[prop] = "Not found";
        }
    }



    return yeastmineTemplate;
};

let parseEnsembl = function (data) {

    const ensemblTemplate = {
        ensemblID: data.id,
        description: data.description,
        dnaSequence: "Not found", // Information unavailable via regular API
        geneLocation: "Not found", // Information unavailable via regular API
    };

    for (var prop in ensemblTemplate) {
        if ((ensemblTemplate[prop] === undefined) || (ensemblTemplate[prop] === null)) {
            ensemblTemplate[prop] = "Not found";
        }
    }
    return ensemblTemplate;

};

let parseJaspar = function (data) {

    const jasparTemplate = {
        jasparID : data.matrix_id,
        class: data.class[0],
        family: data.family[0],
        sequenceLogo: data.sequence_logo,
        frequencyMatrix: data.pfm,
    };

    for (var prop in jasparTemplate) {
        if ((jasparTemplate[prop] === undefined) || (jasparTemplate[prop] === null)) {
            jasparTemplate[prop] = "Not found";
        }
    }

    return jasparTemplate;
};


(function ($) {
    window.api = {
        getGeneInformation: function (symbol) {
            return $.when(
             getNCBIInfo(symbol)
           ).then(function (info1) {
               defaultValues.ncbi = parseNCBI(info1);
               return getUniProtInfo(symbol);
           }).catch(function () {
               return getUniProtInfo(symbol);
           }).then(function (info2) {
               defaultValues.uniprot = parseUniprot(info2);
               return getYeastMineInfo(symbol);
           }).catch(function () {
               return getYeastMineInfo(symbol);

           }).then(function (info3) {
               defaultValues.sgd = parseYeastmine(info3);
               return getEnsemblInfo(symbol);
           }).catch(function () {
               return getEnsemblInfo(symbol);
           }).then(function (info4) {
               defaultValues.ensembl = parseEnsembl(info4);
               return getGeneOntologyInfo(symbol);
           }).catch(function () {
               return getGeneOntologyInfo(symbol);
           }).then(function (info5) {
               defaultValues.geneOntology = parseGeneOntology(info5);
               return getRegulationInfo(symbol);
           }).catch(function () {
               return getRegulationInfo(symbol);
           }).then(function (info6) {
               defaultValues.regulators = parseRegulators(info6, symbol);
               return getJasparInfo(symbol);
           }).catch(function () {
               return getJasparInfo(symbol);
           }).then(function (info7) {
               defaultValues.jaspar = parseJaspar(info7);
               return defaultValues;
           }).catch(function () {

               if (
                 defaultValues.ncbi === defaultNCBI &&
                 defaultValues.uniprot === defaultUniprot &&
                 defaultValues.sgd === defaultYeastmine &&
                 defaultValues.ensembl === defaultEnsembl &&
                 defaultValues.jaspar === defaultJaspar
               ) {
                   const errorString1 = "No gene information was retrieved for " + symbol + ".";

                   const errorString2 = "This could have happened because either"
                    + " GRNsight could not access the gene information from one of the source databases"
                    + " or because no information exists for the gene in the source databases.";

                   const errorString3 = "You can check back later to see if gene information"
                    + " can be retrieved or submit an issue to https://github.com/dondi/GRNsight.";

                   $("#error1").text(errorString1);
                   $("#error2").text(errorString2);
                   $("#error3").text(errorString3);
                   $("#errorModal").modal("show");
               }

               return defaultValues;
           });
        }
    };
})($);
