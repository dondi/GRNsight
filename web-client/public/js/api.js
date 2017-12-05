"use strict";

// Using "use strict" global

(function ($) {
    window.api = {
        getGeneInformation: function (symbol) {
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
                // return $.get({
                //     url: "https://yeastmine.yeastgenome.org/yeastmine/service/data/Gene?symbol=" + geneSymbol,
                //     dataType: "json",
                //     beforeSend: function (xhr) {
                //         xhr.setRequestHeader("content-type", "application/json");
                //     },
                // }).then(function (data) {
                //     return $.get({
                //        // TODO: This part
                //     });
                // });
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
                return window.fetch("http://jaspar.genereg.net/api/v1/matrix/?tax_id=4932&search=" + geneSymbol, {
                    mode: "no-cors",
                }).then(function (data) {
                    return (data.count === 0 ?
                        null :
                        window.fetch("http://jaspar.genereg.net/api/v1/matrix/" + data.results[0].matrix_id, {
                            mode: "no-cors",
                        })
                    );
                });
            };

            // change if any preprocessing needs to be done on the data before being given to the application
            var filterData = function (uniprotInfo, ncbiInfo, yeastmineInfo, ensemblInfo, jasparInfo) {
                return {
                    jaspar: {
                        jasparID : jasparInfo.matrix_id, // string
                        class: jasparInfo.class, // string
                        family: jasparInfo.family, // array
                        sequenceLogo: jasparInfo.sequence_logo, // string: URL to image
                        frequencyMatrix: jasparInfo.pfm,  // object with keys ACIG, each key mapping to an array of ints
                    },
                    ncbi: {
                        ncbiID: "etc.",
                        locusTag: "etc.",
                        alsoKnownAs: "etc.",
                        chromosomeSequence: "etc.",
                        genomicSequence: "etc.",
                        proteinSequence: "etc.",
                    },
                    emsembl: {
                        ensemblID: "etc.",
                        description: "etc.",
                        dnaSequence: "etc.",
                        geneLocation: "etc.",
                        geneMap: "URL",
                    },
                    uniprot: {
                        uniprotID: "etc.",
                        proteinSequence: "etc.",
                        similarProtein: { name: "etc.", id: "etc." },
                        proteinType: "etc.",
                        species: "etc.",
                    },
                    sgd: {
                        sgdID: "etc.",
                        standardName: "etc.",
                        systematicName: "etc.",
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
                        geneOntologySummary: "etc.",
                        molecularFunction: "etc.",
                        biologicalProcess: "etc.",
                        cellularComponent: "etc.",
                    },
                };
            };

            // TODO: Error Handling, Mock Testing, Data filtering
            return $.when(
                getUniProtInfo(symbol),
                getNCBIInfo(symbol),
                getYeastMineInfo(symbol),
                getEnsemblInfo(symbol),
                getJasparInfo(symbol)
            ).done(function (uniprotInfo, ncbiInfo, yeastmineInfo, ensemblInfo, jasparInfo) {
                return filterData(uniprotInfo, ncbiInfo, yeastmineInfo, ensemblInfo, jasparInfo);
            });
        }
    };
})($);
