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
    var enabled = $(this).prop("checked");
    $(".grnTest").css("overflow", (enabled ? "auto" : "visible"));
    $(".grnTest").css("height", (enabled ? "" : $(".grnsight-container").height()));
    $(".grnTest").css("width", (enabled ? "" : $(".grnsight-container").width()));
  });

})