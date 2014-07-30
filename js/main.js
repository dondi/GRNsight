$( window ).load( function() {

	// Attach sticky functionality to the navbar
	$( "#stickyBar" ).sticky( { topSpacing:0 } );

    // Documentation page only: Makes links open their respective sections when clicked
    $("#showSection2").click(function (){
        $("#section1Content").collapse('hide');
        $("#section2Content").collapse('show');
    });
    $("#showSection3").click(function() {
        $("#section1Content").collapse('hide');
        $("#section3Content").collapse('show');
    })

    $( "#modified").html( document.lastModified );

    // Enable logo change on-hover
    $( "#GRNsightLogo" ).on( "mouseenter", function() {
    	$("#GRNsightLogo").attr("src", "images/GRNsight_logo_20140710_rollover_resized.jpg")
    })
                .on("mouseleave", function() {
    	$("#GRNsightLogo").attr("src", "images/GRNsight_logo_20140710_main_resized.jpg")
    });

})