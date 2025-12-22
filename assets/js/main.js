$(function () {

    var LEFT_WINDOW_BOUNDARY = 1;
    var SCROLL_START_POINT = 140;
    var LOGO_DEFAULT = "/GRNsight/assets/images/GRNsight_logo_20140710_main_resized.jpg";
    var LOGO_HOVER = "/GRNsight/assets/images/GRNsight_logo_20140710_rollover_resized.jpg";

    var PRIVACY_COOKIE = "_grnsight_privacy_";
    const EXPIRATION_DURATION = 14 * 24 * 60 * 60 * 1000;

    const setupGoogleAnalytics = () => {
        (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,"script","//www.google-analytics.com/analytics.js","ga");

        ga("create", "UA-54882218-1", "auto");
        ga("send", "pageview");
    }

    const clearGoogleAnalytics = () => {
        document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.dondi.github.io"
        document.cookie = "_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.dondi.github.io"
    }

    var checkForPrivacyCookie = function () {
        // Thank you http://stackoverflow.com/questions/4825683/how-do-i-create-and-read-a-value-from-cookie
        var createCookie = function (name, decision) {
            window.localStorage.setItem(`${name}-decision`, decision);
            window.localStorage.setItem(`${name}-expiration`, Date.now() + EXPIRATION_DURATION);
        };

        var getCookie = function (name) {
            const decision = window.localStorage.getItem(`${name}-decision`)
            const expiration = window.localStorage.getItem(`${name}-expiration`);
            if (decision) {
                // We start over if we haven’t visited in 2 weeks.
                if (Date.now() - Number(expiration) > EXPIRATION_DURATION) {
                    return null;
                } else {
                    // Someone who keeps coming back will get renewed.
                    window.localStorage.setItem(`${name}-expiration`, Date.now() + EXPIRATION_DURATION);
                    return decision;
                }
            } else {
                return null;
            }
        };

        const cookieSetting = getCookie(PRIVACY_COOKIE)
        if (cookieSetting === "accept") {
            setupGoogleAnalytics();
        } else if (cookieSetting === "decline") {
            clearGoogleAnalytics();
        } else {
            $("#cookie-notice").removeClass("hidden");

            $("#accept-cookies").on("click", () => {
                createCookie(PRIVACY_COOKIE, "accept");
                setupGoogleAnalytics();
            });

            $("#decline-cookies").on("click", () => {
                createCookie(PRIVACY_COOKIE, "decline");
                clearGoogleAnalytics();
            });

        }
    };

    var changeImageOnHover = function (contentID, imageSrcDefault, imageSrcOnHover) {
        $(contentID).on("mouseenter", function () {
            $(contentID).attr("src", imageSrcOnHover);
        }).on("mouseleave", function () {
            $(contentID).attr("src", imageSrcDefault);
        });
    };

    var detachSidebar = function (sidebarID) {
        $(sidebarID).attr("class", "affix-top");
    };

    var attachSidebar = function (sidebarID) {
        $(sidebarID).attr("class", "affix");
    };

    var disableSidebarHorizontalMovement = function (sidebarID) {
        $(window).scroll(function() {
            var userHasScrolledRight = $(window).scrollLeft() >= LEFT_WINDOW_BOUNDARY;
            var sidebarShouldScroll = $(window).scrollTop() > SCROLL_START_POINT;
            var sidebarIsAttached = ($(sidebarID).attr("class")) === "affix" ? true : false;
            if ((userHasScrolledRight && sidebarShouldScroll) || (!sidebarShouldScroll && sidebarIsAttached)) {
                detachSidebar(sidebarID);
            } else if (sidebarShouldScroll && !sidebarIsAttached) {
                attachSidebar(sidebarID);
            }
        });
    };

    var openCollapsedHashedElements = function () {
        // Open a hashed element if it is collapsed.  This is a little trickier than it sounds,
        // because then we also have to open any parents that are also collapsed.
        if (location.hash) {
            var $elementToOpen = $(location.hash);
            if ($elementToOpen.is(".collapse:not(.in)")) {
                $elementToOpen.parents(".collapse:not(.in)").collapse("show");
                $elementToOpen.collapse("show");
            }
        }
    };

    var focusWindowOn = function (location) {
        window.location.href = location;
    };

    var openPanel = function (panelID) {
        $(panelID).collapse("show");
    };

    var changePageFocusEvenIfPanelsOpen = function (linkToPanel, panelID, targetHref) {
        $(linkToPanel).on("click", function () {
            openPanel(panelID);

            var panelWasClosed = $(panelID).attr("class") === "panel-collapse collapse in";
            if (panelWasClosed) {
                focusWindowOn(targetHref);
            }
        });
    };

    var configurePanelBehavior = function (linkToPanel, panelID, targetHref) {
        $(panelID).on("shown.bs.collapse", function () {
            focusWindowOn(targetHref);
        });
        changePageFocusEvenIfPanelsOpen(linkToPanel, panelID, targetHref);
    };

    var setupDocumentationPanels = function () {
        var documentationPanelInformation = [ [ ".showSection2", "#section2Content", "#section2" ],
                                              [ ".showSection3", "#section3Content", "#section3" ] ];
        documentationPanelInformation.forEach(function (panelInfo) {
            configurePanelBehavior.apply(null, panelInfo);
        });
    };

    var initializePage = function () {
        checkForPrivacyCookie();
        changeImageOnHover("#GRNsightLogo", LOGO_DEFAULT, LOGO_HOVER);
        disableSidebarHorizontalMovement("#stickyBar");
        openCollapsedHashedElements();

        var pageIsDocumentationPage = (location.pathname === "/GRNsight/documentation.html");
        if (pageIsDocumentationPage) {
            setupDocumentationPanels();
        }
    };

    initializePage();
});
