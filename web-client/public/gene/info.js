(function () {
    var search = location.search.substring(1);
    var obj = search?JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g ,'":"') + '"}',
      function ( key, value) {
          return key === "" ? value : decodeURIComponent(value);
      }):{};

    document.title = "Information About " + obj.symbol;
    // This is cite used to find the parsing:
    // https://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object

    api.getGeneInformation(obj.symbol).done(function (gene) {
        console.log(gene);

        var sgdHrefTemplate = "https://www.yeastgenome.org/locus/";
        var sgdId = gene.sgd.sgdID;
        $(".sgd-link").text(sgdId).attr({ href: sgdHrefTemplate + sgdId });

        var ncbiHrefTemplate = "https://www.ncbi.nlm.nih.gov/gene/";
        var ncbiId = gene.ncbi.ncbiID;
        $(".ncbi-link").text(ncbiId).attr({ href: ncbiHrefTemplate + ncbiId });

        var ensemblHrefTemplate = "https://www.ensembl.org/Saccharomyces_cerevisiae/Gene/" +
        "/Summary?db=core;g=YFL039C;r=VI:53260-54696;t=";
        var ensemblId = gene.emsembl.ensemblID;
        $(".ensembl-link").text(ensemblId).attr({ href: ensemblHrefTemplate + ensemblId });

        var uniprotHrefTemplate = "http://www.uniprot.org/uniprot/";
        var uniprotId = gene.uniprot.uniprotID;
        $(".uniprot-link").text(uniprotId).attr({ href: uniprotHrefTemplate + uniprotId });
    })
})();
