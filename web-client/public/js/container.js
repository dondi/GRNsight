$(function () {
  var grnTest = $(".grnTest");
  var container = $(".grnsight-container");
  var enableScroll = $("#enableScroll");
  var pageWidth = $(window).width();

  var WIDTH_OFFSET = 250;
  var HEIGHT_OFFSET = 53;

  var windowWidth = $(window).width() - WIDTH_OFFSET;
  var windowHeight = $(window).height() - HEIGHT_OFFSET;

  if (pageWidth < 1500) {
      $('#boundBoxS').prop('checked', true);
      container.addClass("containerS");
  } else if (pageWidth > 1500 && pageWidth < 2200) {
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
      if (currentValue === "containerFit") {
          container.css({width: windowWidth, height: windowHeight});
      } else {
          container.css({width: "", height: ""});
      }
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
