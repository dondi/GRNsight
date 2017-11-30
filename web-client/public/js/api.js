"use strict";

// Using "use strict" global

(function ($) {
    window.api = {
        getGeneInformation: function (symbol) {
            var getUniProtInfo = function (geneSymbol) {
                return $.get("http://www.uniprot.org/uploadlists/", {
                    from: "GENENAME",
                    to: "ACC",
                    format: "tab",
                    taxon: "559292",
                    query: geneSymbol
                }).then(function (data) {
                    var regex = new RegExp(geneSymbol + "[ \t\r\n\v\f]*([A-Z0-9]+)", "gm");
                    var id = regex.exec(data)[1];
                    return $.get({
                        url: "http://www.uniprot.org/uniprot/" + id + ".xml",
                        crossDomain: true,
                    });
                }).then(function (info) {
                    console.log(info);
                });
            };
            getUniProtInfo(symbol);
        }
    };
})($);
