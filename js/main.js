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
    });

    // Documentation page only: Makes links open their respective sections when clicked
    $('#section2Content').on('shown.bs.collapse', function() {
        window.location.href = '#section2';
    });
    $('#section3Content').on('shown.bs.collapse', function() {
        window.location.href = '#section3';
    });
    // If the links are already open, the above handlers won't fire, so we force the page to change in that case
    // Using .on because using .click doesn't work for some reason
    $('.showSection3').on('click', function() {
        $('#section3Content').collapse('show');
        if($('#section3Content').attr('class') === 'panel-collapse collapse in') {
            window.location.href = '#section3';
        };
    });
    $('.showSection2').on('click', function() {
        $('#section2Content').collapse('show');
        if($('#section2Content').attr('class') === 'panel-collapse collapse in') {
            window.location.href = '#section2';
        };
    });

    // Enable logo change on-hover
    $( "#GRNsightLogo" ).on( "mouseenter", function() {
    	$("#GRNsightLogo").attr("src", "images/GRNsight_logo_20140710_rollover_resized.jpg")
    }).on("mouseleave", function() {
    	$("#GRNsightLogo").attr("src", "images/GRNsight_logo_20140710_main_resized.jpg")
    });

})