$(function () {
  var grnTest = $(".grnTest");
  var grnParent = $(".grnParent");
  var container = $(".grnsight-container");
  var enableScroll = $("#enableScroll");

  $(".boundBoxSize").on("click", function () {
    var currentValue = $(this).val();
    var grnsightContainerClass = "grnsight-container " + currentValue;
    if (!container.hasClass(currentValue)) {
      container.attr("class", grnsightContainerClass);
      $("#reload").trigger("click");
      if (currentValue === "containerInfinite") {
          grnTest.css("height", "900px");
          grnTest.css("width", "1600px");
          let halfVisibleHeight =
                (container.height() / 2) - (grnTest.height() / 2);
          let halfVisibleWidth =
                (container.width() / 2) - (grnTest.width() / 2);
          grnTest.scrollTop(halfVisibleHeight);
          grnTest.scrollLeft(halfVisibleWidth);
          grnTest.css("overflow", "auto");
          grnTest.addClass("grnTestNoScroll");
          enableScroll.prop("disabled", true);
          grnParent.css("overflow", "hidden")
      } else if ($(".grnTest").hasClass("grnTestNoScroll")) {
          grnTest.removeClass("grnTestNoScroll");
          enableScroll.prop("disabled", false);
          enableScroll.trigger("click");
          enableScroll.trigger("click");
          grnParent.css("overflow", "auto")
      }
    };
  });

  enableScroll.on("click", function () {
    var enabled = $(this).prop("checked");
    grnTest.css("overflow", (enabled ? "auto" : "visible"));
    grnTest.css("height", (enabled ? "" : container.height()));
    grnTest.css("width", (enabled ? "" : container.width()));
  });

})
