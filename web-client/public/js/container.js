$(function () {
  var grnTest = $(".grnTest");
  var container = $(".grnsight-container");
  var enableScroll = $("#enableScroll");
  var pageWidth = $(window).width();

  var WIDTH_OFFSET = 250;
  var HEIGHT_OFFSET = 53;

  var MEDIUM_PAGE_WIDTH = 1500;
  var LARGE_PAGE_WIDTH = 2200;


  var windowWidth = $(window).width() - WIDTH_OFFSET;
  var windowHeight = $(window).height() - HEIGHT_OFFSET;

  if (pageWidth < MEDIUM_PAGE_WIDTH) {
      $('#boundBoxS').prop('checked', true);
      container.addClass("containerS");
  } else if (pageWidth > MEDIUM_PAGE_WIDTH && pageWidth < LARGE_PAGE_WIDTH) {
      $('#boundBoxM').prop('checked', true);
      container.addClass("containerM");
  } else {
      $('#boundBoxL').prop('checked', true);
      container.addClass("containerL");
  }

  $(".boundBoxSize").on("click", function () {
    var currentValue = $(this).val();
    var grnsightContainerClass = "grnsight-container " + currentValue;
    if (!container.hasClass(currentValue)) {
      container.attr("class", grnsightContainerClass);
      container.css(currentValue === "containerFit" ?
          {width: windowWidth, height: windowHeight} :
          {width: "", height: ""}
      );
    };
  });

  $(window).on("resize", function () {
    windowWidth = $(window).width() - WIDTH_OFFSET;
    windowHeight = $(window).height() - HEIGHT_OFFSET;
    if (container.hasClass("containerFit")) {
        container.css({width: windowWidth, height: windowHeight});
    }
  });

})
