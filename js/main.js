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
    $('#section2Content').on('shown.bs.collapse', function() {
        window.location.href = '#section2';
    });
    $('#section3Content').on('shown.bs.collapse', function() {
        window.location.href = '#section3';
    });

    // Change the modified time of the web page
    $( "#modified").html( document.lastModified );

    // Enable logo change on-hover
    $( "#GRNsightLogo" ).on( "mouseenter", function() {
    	$("#GRNsightLogo").attr("src", "images/GRNsight_logo_20140710_rollover_resized.jpg")
    })
                .on("mouseleave", function() {
    	$("#GRNsightLogo").attr("src", "images/GRNsight_logo_20140710_main_resized.jpg")
    });

})