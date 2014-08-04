$(function() {

    $(window).scroll(function() {
        // This prevents the side bar from staying stuck when the user has scrolled left. Also, when the user would zoom
        // in, the sidebar would stay stuck. This prevents that.
        if( ($(window).scrollLeft() >= 30 && $(window).scrollTop() > 140) || ($(window).scrollTop() < 140 &&  $("#stickyBar").attr('class') != 'affix-top') ) {
            $("#stickyBar").attr('class', 'affix-top');
        // Re-sticks the sidebar after being unstuck due to left scroll.
        } else if($(window).scrollTop() > 140 && $("#stickyBar").attr('class') != 'affix') {
            $("#stickyBar").attr('class', 'affix');
        } 
    })

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