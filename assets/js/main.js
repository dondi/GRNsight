$(function() {

    var initializePage = function () {
        changeImageOnHover('#GRNsightLogo', '/GRNsight/assets/images/GRNsight_logo_20140710_main_resized.jpg', '/GRNsight/assets/images/GRNsight_logo_20140710_rollover_resized.jpg');
        configureSidebarScrollingBehavior( '#stickyBar' );
        openCollapsedHashedElements();

        var pageIsDocumentationPage = (location.pathname === "/GRNsight/documentation.html");
        if ( pageIsDocumentationPage )  {
            setupDocumentationPanels();
        } 
    }

    var changeImageOnHover = function ( contentID, imageSrcDefault, imageSrcOnHover ) {
        $( contentID ).on( 'mouseenter', function () {
            $( contentID ).attr('src', imageSrcOnHover)
        }).on( 'mouseleave', function () {
            $( contentID ).attr('src', imageSrcDefault)
        })
    }

    var configureSidebarScrollingBehavior = function ( sidebarID ) {
        $( window ).scroll( function() {
            disableHorizontalMovement( sidebarID );
        });
    }

    var leftWindowBoundary = 1,
        sidebarScrollStartPoint = 140;

    var disableHorizontalMovement = function ( sidebarID ) {
        var userHasScrolledRight = $(window).scrollLeft() >= leftWindowBoundary,
            sidebarShouldBeScrolling = $(window).scrollTop() > sidebarScrollStartPoint,
            sidebarIsAttached = ($( sidebarID ).attr('class')) === 'affix' ? true : false;

        if ( (userHasScrolledRight && sidebarShouldBeScrolling) || (!sidebarShouldBeScrolling &&  sidebarIsAttached) ) {
            detachSidebar( sidebarID );
        } else if(sidebarShouldBeScrolling && !sidebarIsAttached) {
            attachSidebar( sidebarID );
        } 
    }

    var detachSidebar = function ( sidebarID ) {
        $( sidebarID ).attr('class', 'affix-top');
    }

    var attachSidebar = function ( sidebarID ) {
        $( sidebarID ).attr('class', 'affix');
    }

    var openCollapsedHashedElements = function () {
        // Open a hashed element if it is collapsed.  This is a little trickier than it sounds,
        // because then we also have to open any parents that are also collapsed.
        if (location.hash) {
            var $elementToOpen = $(location.hash);
            if ($elementToOpen.is('.collapse:not(.in)')) {
                $elementToOpen.parents('.collapse:not(.in)').collapse('show');
                $elementToOpen.collapse('show');
            }
        }
    }

    var setupDocumentationPanels = function () {
        var documentationPanelInformation = [ [ '.showSection2', '#section2Content', '#section2' ],
                                              [ '.showSection3', '#section3Content', '#section3' ] ];
        documentationPanelInformation.forEach( function ( panelInfo ) {
            configurePanelBehavior.apply(null, panelInfo);
        });
    }

    var configurePanelBehavior = function (linkToPanel, panelID, targetHref) {
        $( panelID ).on('shown.bs.collapse', function () {
            focusWindowOn( targetHref );
        });
        changePageFocusEvenIfPanelsOpen(linkToPanel, panelID, targetHref);
    };

    var changePageFocusEvenIfPanelsOpen = function (linkToPanel, panelID, targetHref) {
        $( linkToPanel ).on('click', function () {
            openPanel( panelID );

            var panelWasClosed = $( panelID ).attr('class') === 'panel-collapse collapse in';
            if( panelWasClosed ) {
                focusWindowOn( targetHref );
            };
        });
    }

    var focusWindowOn = function ( location ) {
        window.location.href = location;
    }

    var openPanel = function ( panelID ) {
        $( panelID ).collapse('show');
    }

    initializePage();

});
