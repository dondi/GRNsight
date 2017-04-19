$(function () {
  var grnTest = $(".grnTest");
  var container = $(".grnsight-container");
  var enableScroll = $("#enableScroll");
  var pageWidth = $(window).width();

  if (pageWidth < 1500) {
      $('#boundBoxS').prop('checked', true);
      $(".containerDefault").attr("class", "grnsight-container containerS");
  } else if (pageWidth > 1500 && pageWidth < 2200) {
      $('#boundBoxM').prop('checked', true);
      $(".containerDefault").attr("class", "grnsight-container containerM");
  } else {
      $('#boundBoxL').prop('checked', true);
      $(".containerDefault").attr("class", "grnsight-container containerL");
  }

  $(".boundBoxSize").on("click", function () {
    var currentValue = $(this).val();
    var grnsightContainerClass = "grnsight-container " + currentValue;
    if (!container.hasClass(currentValue)) {
      container.attr("class", grnsightContainerClass);
    };
  });

})
