$(function () {
  
  $(".boundBoxSize").on("click", function () {
    var currentValue = $(this).val();
    var grnsightContainerClass = "grnsight-container " + currentValue;
    if (!$(".grnsight-container").hasClass(currentValue)) {
      $(".grnsight-container").attr("class", grnsightContainerClass);
    };
  });

  /*$("#enableScroll").on("click", function () {
    $(".grnsight-container").toggleClass("containerScroll");
  });*/

})