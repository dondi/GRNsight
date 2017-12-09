"use strict";

// Using "use strict" global

(function ($) {
    window.api = {
        getGeneInformation: function (symbol) {
            var serializer = new XMLSerializer();
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
                }).then(function (data) {
                    var regex = new RegExp(geneSymbol + "[ \t\r\n\v\f]*([A-Z0-9]+)", "gm");
                    var id = regex.exec(data)[1];
                    return $.get({
                        url: "http://www.uniprot.org/uniprot/" + id + ".xml",
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
                }).then(function (data) {
                    var regex = /<Id>(\d*)<\/Id>/gm;
                    var id = regex.exec(data)[1];
                    return $.get({
                        url: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id=" + id,
                        dataType: "xml",
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
                    console.log(data.results.filter(function (data) {
                        return data.primaryIdentifier[0] === "S";
                    }));
                    return(data.results.filter(function (data) {

                        return data.primaryIdentifier[0] === "S";
                    }));
                });
            };

            var getEnsemblInfo = function (geneSymbol) {
                return $.get({
                    url: "http://rest.ensembl.org/lookup/symbol/saccharomyces_cerevisiae/" + geneSymbol,
                    dataType: "json",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("content-type", "application/json");
                    },
                }).then(function (data) {
                    return $.get({
                        url: "http://rest.ensembl.org/lookup/id/" + data.id + "?expand=1",
                        dataType: "json",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("content-type", "application/json");
                        },
                    });
                });
            };

            var getJasparInfo = function (geneSymbol) {
                return $.get({
                    url: "http://jaspar.genereg.net/api/v1/matrix/?tax_id=4932&search=" + geneSymbol,
                    dataType: "json",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("content-type", "application/json");
                    },
                }).then(function (data) {
                    return (data.count === 0 ?
                        null :
                        $.get({
                            url: "http://jaspar.genereg.net/api/v1/matrix/" + data.results[0].matrix_id,
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
                    console.log(uniprotInfo[0]);
                    return {
                        uniprotID: serializer.serializeToString(data.getElementsByTagName("name")[0]),
                        proteinSequence: serializer.serializeToString(data.getElementsByTagName("sequence")[0]),
                        similarProtein: { name: "etc.", id: "etc." },
                        proteinType:serializer.serializeToString(data.getElementsByTagName("protein")[0].childNodes[1].childNodes[1]),
                        species: serializer.serializeToString(data.getElementsByTagName("organism")[0].childNodes[1]),
                    }
                }

                var parseNCBI = function (data) {
                    var tagArray = serializer.serializeToString(data.getElementsByTagName("OtherAliases")[0]).split(",");
                    return {
                        ncbiID: "etc.",
                        locusTag: tagArray[0],
                        alsoKnownAs: tagArray.slice(1),
                        chromosomeSequence: "etc.",
                        genomicSequence: "etc.",
                        proteinSequence: "etc.",
                    }
                }

                var parseYeastmine = function (data) {
                    return {
                        sgdID: data.primaryIdentifier, //string
                        standardName: data.symbol, //string
                        systematicName: data.secondaryIdentifier, //string
                        regulators: 1,
                        targets: 12,
                        totalInteractions: "etc.",
                        affinityCaptureMS: 11,
                        affinityCaptureRNA: 1,
                        affinityCaptureWestern: 4,
                        biochemicalActivity: 11,
                        colocalization: 3,
                        reconstitutedComplex: 2,
                        twoHybrid: 3,
                        dosageRescue: 16,
                        negativeGenetic: 8,
                        phenotypicEnhancement: 1,
                        phenotypicSuppression: 5,
                        syntheticGrowthDefect: 2,
                        syntheticHaploinsufficiency: 1,
                        syntheticLethality: 6,
                        syntheticRescue: 11,
                        geneOntologySummary: data.functionSummary, //string
                        molecularFunction: "etc.",
                        biologicalProcess: "etc.",
                        cellularComponent: "etc.",
                    }
                }

                var parseEnsembl = function (data) {
                    return {
                        ensemblID: "etc.",
                        description: "etc.",
                        dnaSequence: "etc.",
                        geneLocation: "etc.",
                        geneMap: "URL",
                    }
                }

                var parseJaspar = function (data) {
                    return {
                        jasparID : data.matrix_id, // string
                        class: data.class, // string
                        family: data.family, // array
                        sequenceLogo: data.sequence_logo, // string: URL to image
                        frequencyMatrix: data.pfm,  // object with keys ACIG, each key mapping to an array of ints
                    }
                }
                return {
                    // jaspar: parseJaspar(),
                    ncbi: parseNCBI(ncbiInfo[0]),
                    emsembl: parseEnsembl(ensemblInfo[0]),
                    uniprot: parseUniprot(uniprotInfo[0]) ,
                    sgd: parseYeastmine(yeastmineInfo[0]),
                };
            };

            // TODO: Error Handling, Mock Testing, Data filtering
            return $.when(
                getUniProtInfo(symbol),
                getNCBIInfo(symbol),
                getYeastMineInfo(symbol),
                getEnsemblInfo(symbol)
                // getJasparInfo(symbol)
            ).done(function (uniprotInfo, ncbiInfo, yeastmineInfo, ensemblInfo, jasparInfo) {
                return filterData(uniprotInfo, ncbiInfo, yeastmineInfo, ensemblInfo, jasparInfo);
            });
        }
    };
})($);
