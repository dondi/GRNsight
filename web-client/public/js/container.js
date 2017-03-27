$(function () {
  var grnTest = $(".grnTest");
  var container = $(".grnsight-container");
  var enableScroll = $("#enableScroll");
  var pageWidth = $(window).width();

  if (pageWidth < 1500) {
      $('#boundBoxS').prop('checked', true);
  } else if (pageWidth > 1500 && pageWidth < 2300) {
      $('#boundBoxM').prop('checked', true);
  } else {
      $('#boundBoxL').prop('checked', true);
  }

  $(".boundBoxSize").on("click", function () {
    if (container.hasClass('containerDefault')) {
      container.removeClass('containerDefault');
    }
    var currentValue = $(this).val();
    var grnsightContainerClass = "grnsight-container " + currentValue;
    if (!container.hasClass(currentValue)) {
      container.attr("class", grnsightContainerClass);
      $("#reload").trigger("click");
    };
  });

  enableScroll.on("click", function () {
    var enabled = $(this).prop("checked");
    grnTest.css("overflow", (enabled ? "auto" : "visible"));
    grnTest.css("height", (enabled ? "" : container.height()));
    grnTest.css("width", (enabled ? "" : container.width()));
  });

})
