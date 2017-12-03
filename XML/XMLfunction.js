//I know this code is trash but I'm just using this as a place to dump where I find the stuff that I'm working on.
var serializer = new XMLSerializer();

var doStuff = function() {

    $.get("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id=856321").done(response => {
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

window.onload = doStuff();
