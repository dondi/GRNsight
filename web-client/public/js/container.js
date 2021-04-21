import { VIEWPORT_FIT } from "./constants";

export const container = function () {
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

    

    var setSizeIndicator = function (selector) {
        $("#viewport-size-s span, #viewport-size-m span, #viewport-size-l span, #viewport-size-fit span")
          .removeClass("glyphicon-ok");
        $(selector).addClass("glyphicon-ok");
    };

    var small = function () {
        setSizeIndicator("#viewport-size-s span");
    };

    var medium = function () {
        setSizeIndicator("#viewport-size-m span");
    };

    var large = function () {
        setSizeIndicator("#viewport-size-l span");
    };

    var fit = function () {
        setSizeIndicator("#viewport-size-fit span");
    };

    requestWindowDimensions();

    if (pageWidth < MEDIUM_PAGE_WIDTH) {
        $("#boundBoxS").prop("checked", true);
        small();
        container.addClass("containerS");
    } else if (pageWidth > MEDIUM_PAGE_WIDTH && pageWidth < LARGE_PAGE_WIDTH) {
        $("#boundBoxM").prop("checked", true);
        medium();
        container.addClass("containerM");
    } else {
        $("#boundBoxL").prop("checked", true);
        large();
        container.addClass("containerL");
    }

    $("#viewport-size-s").on("click", function () {
        $("#boundBoxS").prop("checked", true).trigger("click");
        small();
    });

    $("#boundBoxS").on("click", function () {
        $("#boundBoxS").prop("checked", true);
        small();
    });

    $("#viewport-size-m").on("click", function () {
        $("#boundBoxM").prop("checked", true).trigger("click");
        medium();
    });

    $("#boundBoxM").on("click", function () {
        $("#viewport-size-m").prop("checked", true);
        medium();
    });

    $("#viewport-size-l").on("click", function () {
        $("#boundBoxL").prop("checked", true).trigger("click");
        large();
    });

    $("#boundBoxL").on("click", function () {
        $("#viewport-size-l").prop("checked", true);
        large();
    });

    $("#viewport-size-fit").on("click", function () {
        $("#boundBoxFit").prop("checked", true).trigger("click");
        fit();
    });

    $("#boundBoxFit").on("click", function () {
        $("#viewport-size-fit").prop("checked", true);
        fit();
    });

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

    $(".boundBoxSize").on("click", function () {
        var currentValue = $(this).val();
        var grnsightContainerClass = `grnsight-container ${currentValue}`;
        if (!container.hasClass(currentValue)) {
            container.attr("class", grnsightContainerClass);
            if (currentValue === VIEWPORT_FIT) {
                requestWindowDimensions();
            } else {
                container.css({ width: "", height: "" });
            }
        }
    });
};
