$(function () {
  
  $(".boundBoxSize").on("click", function () {
    var currentValue = $(this).val();
    var grnsightContainerClass = "grnsight-container " + currentValue;
    if (!$(".grnsight-container").hasClass(currentValue)) {
      $(".grnsight-container").attr("class", grnsightContainerClass);
      $("#reload").trigger("click");
    };
  });

  $("#enableScroll").on("click", function () {
    if ($(this).prop("checked")) {
      $(".grnTest").css("overflow", "auto");
      $(".grnTest").css("height", "");
      $(".grnTest").css("width", "");
    } else {
      $(".grnTest").css("overflow", "visible");
      $(".grnTest").css("height", $(".grnsight-container").height());
      $(".grnTest").css("width", $(".grnsight-container").width());
    }
  });

})