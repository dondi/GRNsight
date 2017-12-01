


//I know this code is trash but I'm just using this as a place to dump where I find the stuff that I'm working on.

var xmlToString = xml => new XMLSerializer().serializeToString(xml);


var xml = "";

var doStuff = function() {

$.get("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id=853313").done(response => {
      $("#someElement").append(xmlToString(response));
     // hideLoadingMessage("ncbi");
    });

/*
$.get("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id=853313").done(response => {
      console.log("NCBI", response);
      xml = xmlToString(response);
      hideLoadingMessage("ncbi");
    });
    */


   var xml = new (XMLSerializer()).serializeToString("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id=853313"),
      xmlDoc = $.parseXML( xml ),
      $xml = $( xmlDoc ),
      $title = $xml.find( "Name" );

    // Append "RSS Title" to #someElement
    $( "#someElement" ).append( $title.text() );

    // Change the title to "XML Title"
   // $title.text( "XML Title" );

    // Append "XML Title" to #anotherElement
    //$( "#anotherElement" ).append( $title.text() );
    }


window.onload = doStuff();
