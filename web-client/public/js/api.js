"use strict";

// Using "use strict" global

(function ($) {
    window.api = {
        getGeneInformation: function (symbol) {
            var serializer = new XMLSerializer();
            var XMLParser = function (data) {
                return serializer.serializeToString(data).replace(/\<.*?\>\s?/g, "");
            };
            var getUniProtInfo = function (geneSymbol) {
                return $.get({
                    url: "http://www.uniprot.org/uploadlists/",
                    data: {
                        from: "GENENAME",
                        to: "ACC",
                        format: "tab",
                        taxon: "559292",
                        query: geneSymbol,
                    },
                    dataType: "text",
                    timeout: 5000,
                }).then(function (data) {
                    var regex = new RegExp(geneSymbol + "[ \t\r\n\v\f]*([A-Z0-9]+)", "gm");
                    var id = regex.exec(data)[1];
                    return $.get({
                        url: "http://www.uniprot.org/uniprot/" + id + ".xml",
                        timeout: 5000,
                    });
                });
            };

            var getNCBIInfo = function (geneSymbol) {
                return $.get({
                    url: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi",
                    data: {
                        db: "gene",
                        term: geneSymbol + "[gene]+Saccharomyces+cerevisiae[Organism]",
                    },
                    dataType: "text",
                    timeout: 5000,
                }).then(function (data) {
                    var regex = /<Id>(\d*)<\/Id>/gm;
                    var id = regex.exec(data)[1];
                    return $.get({
                        url: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id=" + id,
                        dataType: "xml",
                        timeout: 5000,
                    });
                });
            };

            var getYeastMineInfo = function (geneSymbol) {
                return $.get({
                    url: "https://yeastmine.yeastgenome.org/yeastmine/service/data/Gene?symbol=" + geneSymbol,
                    dataType: "json",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("content-type", "application/json");
                    },
                }).then(function (data) {
                    return (data.results.filter(function (data) {
                        return data.primaryIdentifier[0] === "S";
                    }));
                });
            };

            var getEnsemblInfo = function (geneSymbol) {
                return $.get({
                    url: "http://rest.ensembl.org/lookup/symbol/saccharomyces_cerevisiae/" + geneSymbol,
                    dataType: "json",
                    timeout: 5000,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("content-type", "application/json");
                    },
                }).then(function (data) {
                    return $.get({
                        url: "http://rest.ensembl.org/lookup/id/" + data.id + "?expand=1",
                        dataType: "json",
                        timeout: 5000,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("content-type", "application/json");
                        },
                    });
                });
            };

            var getJasparInfo = function (geneSymbol) {
                return $.get({
                    url: "/jaspar/api/v1/matrix/?tax_id=4932&format=json&search=" + geneSymbol,
                    dataType: "json",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("content-type", "application/json");
                    },
                }).then(function (data) {
                    return (data.count === 0 ? {} :
                        $.get({
                            url: "/jaspar/api/v1/matrix/" + data.results[0].matrix_id,
                            dataType: "json",
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("content-type", "application/json");
                            },
                        })
                    );
                });
            };

            // change if any preprocessing needs to be done on the data before being given to the application
            var filterData = function (uniprotInfo, ncbiInfo, yeastmineInfo, ensemblInfo, jasparInfo) {
                var parseUniprot = function (data) {
                    return {
                        uniprotID: XMLParser(data.getElementsByTagName("name")[0]),
                        proteinSequence: XMLParser(data.getElementsByTagName("sequence")[0]),
                        proteinType: XMLParser(data.getElementsByTagName("protein")[0].childNodes[1].childNodes[1]),
                        species: XMLParser(data.getElementsByTagName("organism")[0].childNodes[1]),
                    };
                };

                var parseNCBI = function (data) {
                    var tagArray = serializer.serializeToString(data.getElementsByTagName("OtherAliases")[0]).split(",");
                    return {
                        ncbiID: data.getElementsByTagName("DocumentSummary")[0].getAttribute("uid"),
                        locusTag: tagArray[0].replace(/\<.*?\>\s?/g, ''),
                        alsoKnownAs: tagArray.slice(1).join().replace(/\<.*?\>\s?/g, ''),
                        chromosomeSequence: XMLParser(data.getElementsByTagName("ChrAccVer")[0]),
                        genomicSequence: XMLParser(data.getElementsByTagName("ChrLoc")[0]) + "; "
                        + XMLParser(data.getElementsByTagName("ChrAccVer")[0]) + " ("
                        + XMLParser(data.getElementsByTagName("ChrStart")[0])
                         + ".." + XMLParser(data.getElementsByTagName("ChrStop")[0]) + ")",
                    };
                };

                var parseYeastmine = function (data) {
                    return {
                        sgdID: data.primaryIdentifier, // string
                        standardName: data.symbol, // string
                        systematicName: data.secondaryIdentifier, // string
                        regulators: 1, // regulation
                        targets: 12, // regulation
                        totalInteractions: "etc.", // physicalInteractions
                        affinityCaptureMS: 11, // physicalInteractions
                        affinityCaptureRNA: 1, // physicalInteractions
                        affinityCaptureWestern: 4, // physicalInteractions
                        biochemicalActivity: 11, // physicalInteractions
                        colocalization: 3, // physicalInteractions
                        reconstitutedComplex: 2, // physicalInteractions
                        twoHybrid: 3, // physicalInteractions
                        dosageRescue: 16, // geneticInteractions
                        negativeGenetic: 8, // geneticInteractions
                        phenotypicEnhancement: 1, // geneticInteractions
                        phenotypicSuppression: 5, // geneticInteractions
                        syntheticGrowthDefect: 2, // geneticInteractions
                        syntheticHaploinsufficiency: 1, // geneticInteractions
                        syntheticLethality: 6, // geneticInteractions
                        syntheticRescue: 11, // geneticInteractions
                        geneOntologySummary: data.functionSummary, // string
                        molecularFunction: "etc.", // Gene Ontology
                        biologicalProcess: "etc.", // Gene Ontology
                        cellularComponent: "etc.", // Gene Ontology
                    };
                };

                var parseEnsembl = function (data) {
                    return {
                        ensemblID: data.id,
                        description: data.description,
                        dnaSequence: "etc.",
                        geneLocation: "etc.",
                        geneMap: "URL",
                    };
                };

                var parseJaspar = function (data) {

                    return data && {
                        jasparID : data.matrix_id, // string
                        class: data.class, // string
                        family: data.family, // array
                        sequenceLogo: data.sequence_logo, // string: URL to image
                        frequencyMatrix: data.pfm,  // object with keys ACIG, each key mapping to an array of ints
                    };
                };
                return {
                    jaspar: parseJaspar(jasparInfo),
                    ncbi: parseNCBI(ncbiInfo),
                    ensembl: parseEnsembl(ensemblInfo),
                    uniprot: parseUniprot(uniprotInfo),
                    sgd: parseYeastmine(yeastmineInfo),
                };
            };

            return $.when(
                getUniProtInfo(symbol),
                getNCBIInfo(symbol),
                getYeastMineInfo(symbol),
                getEnsemblInfo(symbol),
                getJasparInfo(symbol)
            ).then(function (uniprotInfo, ncbiInfo, yeastmineInfo, ensemblInfo, jasparInfo) {
                console.log(
                    "uniprot", uniprotInfo[0],
                    "ncbi", ncbiInfo[0],
                    "yeastmine", yeastmineInfo[0],
                    "ensembl", ensemblInfo[0],
                    "jaspar", jasparInfo[0]);
                return filterData(uniprotInfo[0], ncbiInfo[0], yeastmineInfo[0], ensemblInfo[0], jasparInfo[0]);
            }).fail(function () {
                alert("There was an error retrieving the data from the databases. Please try again later.");
            });
        }
    };
})($);
