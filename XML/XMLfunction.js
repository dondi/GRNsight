var serializer = new XMLSerializer();

var callNCBI = function() {

    $.get("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id=856321" ).done(response => {
        var data = response.getElementsByTagName("OtherAliases")[0];

        var result = serializer.serializeToString(data);
        //creates an array for us to use
        var arr = result.split(",");
        $("#someElement").append("LOTUS Tag: " + arr[0]);

        //gets rid of the LOTUS tag
        arr.splice(0,1);
         $("#anotherElement").append("Also Known As: " + arr);
    });
}
var callUniprot = function() {

    $.get("http://www.uniprot.org/uniprot/P34567.xml").done(response => {
      var protein = response.getElementsByTagName("protein")[0];
    //  var proteinType = serializer.serializeToString(protein.firstChild);
      var proteinType = serializer.serializeToString(protein.childNodes[1].childNodes[1]);
      $("#proteinType").append("Protein Type/Name: "+ proteinType);

      var organism = response.getElementsByTagName("organism")[0];

      var species = serializer.serializeToString(organism.childNodes[1]);
      //Can we please cut the common name out???
      var commonName = serializer.serializeToString(organism.childNodes[3]);
      $("#species").append("Species: " + species + " Common Name:" + commonName );

      var sequence = serializer.serializeToString(response.getElementsByTagName("sequence")[0]);
      $("#sequence").append("Sequence: " + sequence);

      var uniprotID = serializer.serializeToString(response.getElementsByTagName("name")[0]);
      var uniprotAccession = serializer.serializeToString(response.getElementsByTagName("accession")[0]);
      $("#geneID").append("Gene ID: "  + uniprotAccession + " / " + uniprotID);

      //TODO: Similar Proteins (Can't find where the info is coming from, help me please Eddie)

    });

}

window.onload = callNCBI();
window.onload = callUniprot();
