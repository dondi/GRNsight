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

        // General Information Section

        var ensemblInfo = gene.ensembl.description;
        $(".ensemblDescription").text("Description: " + ensemblInfo).attr({ href: ensemblHrefTemplate + ensemblInfo });

        var uniSpecies = gene.uniprot.species;
        $(".uniProtSpecies").text("Species: " + uniSpecies).attr({ href: uniprotHrefTemplate + uniSpecies });

        var ncbiLocus = gene.ncbi.locusTag;
        $(".ncbiLocusTag").text("Locus Tag: " + ncbiLocus).attr({ href: ncbiHrefTemplate + ncbiLocus });

        var jasparFam = gene.jaspar.family;
        $(".jasparFamily").text("Family: " + jasparFam).attr({ href: jasparHrefTemplate + jasparFam });

        var jasparMatrix = gene.jaspar.frequencyMatrix;
        $(".matrixID").text("Matrix ID: " + jasparMatrix).attr({ href: jasparHrefTemplate + jasparMatrix });

        var ncbiChromosome = gene.ncbi.chromosomeSequence;
        $(".chromosomeSequence").text("Chromosome Sequence: " + ncbiChromosome).attr({ href: ncbiHrefTemplate + ncbiChromosome });

      // DNA Sequence Tab
        var ensemblDNA = gene.ensembl.dnaSequence;
        $(".dnaSequence").text(ensemblDNA).attr({ href: ensemblHrefTemplate + ensemblDNA });

      // Protein Information
        var similarUniprotProtein = gene.uniprot.similarProtein;
        $(".similarProtein").text("Similar Protein: " + similarUniprotProtein).attr({ href: uniprotHrefTemplate + similarUniprotProtein });

        var uniprotProteinType = gene.uniprot.proteinType;
        $(".proteinType").text(uniprotProteinType).attr({ href: uniprotHrefTemplate + uniprotProteinType });

        var uniprotProteinSequence = gene.uniprot.proteinSequence;
        $(".proteinSequence").text(uniprotProteinSequence).attr({ href: uniprotHrefTemplate + uniprotProteinSequence });


      // Regulation Information
        var sgdRequlators = gene.sgd.regulators;
        $(".regulators").text("Regulators: " + sgdRequlators).attr({ href: sgdHrefTemplate + sgdRequlators });

        var sgdTargets = gene.sgd.targets;
        $(".targets").text("Targets: " + sgdTargets).attr({ href: sgdHrefTemplate + sgdTargets });

      // Genetic Interactions

      // Interaction: Physical Reaaction
        var sgdInteractions = gene.sgd.totalInteractions;
        $(".totalInteractions").text("Total Interactions: " + sgdInteractions).attr({ href: sgdHrefTemplate + sgdInteractions });

        var sgdAffinityCaptureMS = gene.sgd.affinityCaptureMS;
        $(".affinityCaptureMS").text("Affinity Capture MS: " + sgdAffinityCaptureMS).attr({ href: sgdHrefTemplate + sgdAffinityCaptureMS });

        var sgdAffinityCaptureRNA = gene.sgd.affinityCaptureRNA;
        $(".affinityCaptureRNA").text("Affinity Capture RNA: " + sgdAffinityCaptureRNA).attr({ href: sgdHrefTemplate + sgdAffinityCaptureRNA });

        var sgdAffinityCaptureWesterns = gene.sgd.affinityCaptureWestern;
        $(".affinityCaptureWestern").text("Affinity Capture Westerns: " + sgdAffinityCaptureWesterns).attr({ href: sgdHrefTemplate + sgdAffinityCaptureWesterns });

        var sgdBiochemicalActivity = gene.sgd.biochemicalActivity;
        $(".biochemicalActivity").text("Biochemical Activity: " + sgdBiochemicalActivity).attr({ href: sgdHrefTemplate + sgdBiochemicalActivity });

        var sgdColocalization = gene.sgd.colocalization;
        $(".colocalization").text("Colocalization: " + sgdColocalization).attr({ href: sgdHrefTemplate + sgdColocalization });

        var sgdReconstitutedComplex = gene.sgd.reconstitutedComplex;
        $(".reconstitutedComplex").text("Reconstituted Complex: " + sgdReconstitutedComplex).attr({ href: sgdHrefTemplate + sgdReconstitutedComplex });

        var sgdTwoHybrid = gene.sgd.twoHybrid;
        $(".twoHybrid").text("Two Hybrid: " + sgdTwoHybrid).attr({ href: sgdHrefTemplate + sgdTwoHybrid });

      // Gene Ontology
        var sgdSummary = gene.sgd.geneOntologySummary;
        $(".geneSummary").text(sgdSummary).attr({ href: sgdHrefTemplate + sgdSummary });

        var sgdMolecularFunction = gene.sgd.molecularFunction;
        $(".molecularFunction").text(sgdMolecularFunction).attr({ href: sgdHrefTemplate + sgdMolecularFunction });

        var sgdBiologicalProcess = gene.sgd.biologicalProcess;
        $(".biologicalProcess").text(sgdBiologicalProcess).attr({ href: sgdHrefTemplate + sgdBiologicalProcess });

        var sgdCellularComponent = gene.sgd.cellularComponent;
        $(".cellularComponent").text(sgdCellularComponent).attr({ href: sgdHrefTemplate + sgdCellularComponent });

    });
})();
