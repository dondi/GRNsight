$(function () {

  $(".boundBoxSize").on("click", function () {
    var currentValue = $(this).val();
    var grnsightContainerClass = "grnsight-container " + currentValue;
    if (!$(".grnsight-container").hasClass(currentValue)) {
      $(".grnsight-container").attr("class", grnsightContainerClass);
      $("#reload").trigger("click");
      if (currentValue === "containerInfinite") {
          $(".grnTest").scrollTop(4500);
          $(".grnTest").scrollLeft(4500);
      }
    };
  });

  $("#enableScroll").on("click", function () {
    var enabled = $(this).prop("checked");
    $(".grnTest").css("overflow", (enabled ? "auto" : "visible"));
    $(".grnTest").css("height", (enabled ? "" : $(".grnsight-container").height()));
    $(".grnTest").css("width", (enabled ? "" : $(".grnsight-container").width()));
  });

})
