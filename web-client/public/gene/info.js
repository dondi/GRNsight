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
        var ensemblId = gene.ensembl.ensemblID;
        $(".ensembl-link").text(ensemblId).attr({ href: ensemblHrefTemplate + ensemblId });

        var uniprotHrefTemplate = "http://www.uniprot.org/uniprot/";
        var uniprotId = gene.uniprot.uniprotID;
        $(".uniprot-link").text(uniprotId).attr({ href: uniprotHrefTemplate + uniprotId });

        var jasparHrefTemplate = "http://jaspar.genereg.net/matrix/";
        var jasparId = gene.jaspar.jasparID;
        $(".jaspar-link").text(jasparId).attr({ href: jasparHrefTemplate + jasparId });

      //DNA Sequence Tab
        var ensemblDNA = gene.emsembl.dnaSequence;
        $(".dnaSequence").text(ensemblDNA).attr({ href: ensemblHrefTemplate + ensemblDNA });

      //Protein Information
        var similarUniprotProtein = gene.uniprot.similarProtein;
        $(".similarProtein").text(similarUniprotProtein).attr({ href: uniprotHrefTemplate + similarUniprotProtein }); 

        var uniprotProteinType = gene.uniprot.proteinType;
        $(".proteinType").text(uniprotProteinType).attr({ href: uniprotHrefTemplate + uniprotProteinType });

        var uniprotProteinSequence = gene.uniprot.proteinSequence;
        $(".proteinSequence").text(uniprotProteinSequence).attr({ href: uniprotHrefTemplate + uniprotProteinSequence });
    })


        // General Information Section

        var ensemblInfo = gene.ensembl.description;
        $(".ensemblDescription").text(ensemblInfo).attr({ href: ensemblHrefTemplate + ensemblInfo });

        var uniSpecies = gene.uniprot.species;
        $(".uniProtSpecies").text(uniSpecies).attr({ href: uniprotHrefTemplate + uniSpecies });

        var ncbiLocus = gene.ncbi.locusTag;
        $(".ncbiLocusTag").text(ncbiLocus).attr({ href: ncbiHrefTemplate + ncbiLocus });

        var jasparFam = gene.jaspar.family;
        $(".jasparFamily").text(jasparFam).attr({ href: jasparHrefTemplate + jasparFam });

        var jasparMatrix = gene.jaspar.frequencyMatrix;
        $(".matrixID").text(jasparMatrix).attr({ href: jasparHrefTemplate + jasparMatrix });

        var ncbiChromosome = gene.ncbi.chromosomeSequence;
        $(".chromosomeSequence").text(ncbiChromosome).attr({ href: ncbiHrefTemplate + ncbiChromosome });

    });
})();
