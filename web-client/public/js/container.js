import { VIEWPORT_FIT } from "./constants";

export const container = function () {
    var container = $(".grnsight-container");
    var pageWidth = $(window.top).width();

    // These values are bound to the layout dimensions of the GRNsight website.
    const WIDTH_OFFSET = 250;
    const HEIGHT_OFFSET = 53;

    const MEDIUM_PAGE_WIDTH = 1500;
    const LARGE_PAGE_WIDTH = 2200;

    const fitWindowWidth = () => $(window.top).width() - WIDTH_OFFSET;
    const fitWindowHeight = () => $(window.top).height() - HEIGHT_OFFSET;

    if (pageWidth < MEDIUM_PAGE_WIDTH) {
        $("#boundBoxS").prop("checked", true);
        container.addClass("containerS");
    } else if (pageWidth > MEDIUM_PAGE_WIDTH && pageWidth < LARGE_PAGE_WIDTH) {
        $("#boundBoxM").prop("checked", true);
        container.addClass("containerM");
    } else {
        $("#boundBoxL").prop("checked", true);
        container.addClass("containerL");
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


    $(".boundBoxSize").on("click", function () {
        var currentValue = $(this).val();
        var grnsightContainerClass = "grnsight-container " + currentValue;
        if (!container.hasClass(currentValue)) {
            container.attr("class", grnsightContainerClass);
            container.css({
                width: currentValue === VIEWPORT_FIT ? fitWindowWidth() : "",
                height: currentValue === VIEWPORT_FIT ? fitWindowHeight() : ""
            })
        }
    });

    $(window.top).on("resize", function () {
        if (container.hasClass(VIEWPORT_FIT)) {
            container.css({
                width: fitWindowWidth(),
                height: fitWindowHeight()
            });
        }
    });
};
