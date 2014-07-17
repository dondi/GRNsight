$( window ).load( function() {

	$( "#stickyBar" ).sticky( { topSpacing:0 } );
    $( "#modified").html( document.lastModified );
    $( "#GRNsightLogo" ).on( "mouseenter", function() {
    	$("#GRNsightLogo").attr("src", "images/GRNsight_logo_20140710_rollover_resized.jpg")
    })
                .on("mouseleave", function() {
    	$("#GRNsightLogo").attr("src", "images/GRNsight_logo_20140710_main_resized.jpg")
    });

})