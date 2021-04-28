import { VIEWPORT_FIT } from "./constants";
import { updateApp } from "./update-app";

export const container = function (grnState) {
    var container = $(".grnsight-container");
    var pageWidth = $(window).width();

    // These values are bound to the layout dimensions of the GRNsight website.
    const WIDTH_OFFSET = 250;
    const HEIGHT_OFFSET = 53;

    const MEDIUM_PAGE_WIDTH = 1500;
    const LARGE_PAGE_WIDTH = 2200;

    const HOST_SITE = "https://dondi.github.io";

    const fitContainer = dimensions => {
        if (container.hasClass(VIEWPORT_FIT)) {
            container.css({
                width: dimensions.width - WIDTH_OFFSET,
                height: dimensions.height - HEIGHT_OFFSET
            });
        }
    };

    const fitContainerToWindow = () => {
        fitContainer({
            width: $(window).width(),
            height: $(window).height()
        });
    };

    const requestWindowDimensions = () => {
        // We send a message if we are in an iframe, and manipulate directly if we aren’t.
        if (window === window.top) {
            fitContainerToWindow();
        } else {
            window.top.postMessage("dimensions", HOST_SITE);
        }
    };

    if (window === window.top) {
        $(window).on("resize", fitContainerToWindow);
    } else {
        window.addEventListener("message", event => {
            if (event.origin.indexOf(HOST_SITE) !== 0) {
                return;
            }

            fitContainer(event.data);
        });
    }

    requestWindowDimensions();

    if (pageWidth < MEDIUM_PAGE_WIDTH) {
        grnState.viewportSize = "containerS";
    } else if (pageWidth > MEDIUM_PAGE_WIDTH && pageWidth < LARGE_PAGE_WIDTH) {
        grnState.viewportSize = "containerM";
    } else {
        grnState.viewportSize = "containerL";
    }
    updateApp(grnState);

    $("#restrict-graph-to-viewport").on("click", function () {
        if ($(".viewport").prop("checked")) {
            $("#restrict-graph-to-viewport span").removeClass("glyphicon-ok");
            $(".viewport").prop("checked", false);
            $(".viewport").trigger("change");
        } else {
            $("#restrict-graph-to-viewport span").addClass("glyphicon-ok");
            $(".viewport").prop("checked", true).trigger("change");
        }
    });

    $("#expressionDB").on("click", function () {
        if (!$("#expressionDB span").hasClass("glyphicon-ok")) {
            $("#expressionDB span").addClass("glyphicon-ok");
            $("#expressionDB").trigger("change");
        } else {
            $("#expressionDB span").removeClass("glyphicon-ok");
            $("#expressionDB").trigger("change");
        }
    });
};
