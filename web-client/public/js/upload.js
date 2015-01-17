$(function () {
  // Style of the tooltips
  $(".info").tooltip({
    placement: "top",
    delay: { show: 700, hide: 100 }
  });

  // Defaults the sliders so that they return to their default values when the page is refreshed
  $( "#linkDistInput" ).val(500);
  $( "#chargeInput" ).val(-1000);
  $( "#chargeDistInput" ).val(1000);
  $( "#gravityInput" ).val(0.1);

  /*
  * Thanks to http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
  * for helping to resolve this.
  */
  var loadGrn = function (url, name, formData) {
    // The presence of formData is taken to indicate a POST.
    var fullUrl = $("#service-root").val() + url;
    (formData ?
      $.ajax({
        url: fullUrl,
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        crossDomain: true
      }) :
      $.getJSON(fullUrl)
    ).done(function (network) {
      console.log(network);
      $("#fileName").text(name);
      $("input[type='range']").off("input");
      // If more things need to be turned off, we"ll add them to this array
      var disable = [ "#resetSliders", "#resetSlidersMenu", "#undoReset", "#undoResetMenu" ]
      for(var i = 0; i < disable.length; i++) {
        $(disable[i]).off("click");
      }
      previousFile = [url, name, formData];
      drawGraph(network.genes, network.links, network.positiveWeights, network.negativeWeights, {
        linkSlider: "#linkDistInput",
        chargeSlider: "#chargeInput",
        chargeDistSlider: "#chargeDistInput",
        gravitySlider: "#gravityInput",
        resetSliderButton: "#resetSliders",
        resetSliderMenu: "#resetSlidersMenu",
        undoResetButton: "#undoReset",
        undoResetMenu: "#undoResetMenu"
      }, network.sheetType);
    }).error(function (xhr, status, error) {
      var err = JSON.parse(xhr.responseText);
      // Because the full network is returned, we pull out the errors array from the network.
      errorArray = err.errors;
      $("#upload").val(""); // De-select the bad file.
      var errorString = "Your graph failed to load.<br><br>";
      for(var i = 0; i < errorArray.length; i++) {
        errorString += errorArray[i].possibleCause + " " + errorArray[i].suggestedFix + "<br><br>";
      }
      $("#error").html(errorString);
      $("#myModal").modal("show");
    });
  };

  $("#upload").on("change", function (event) {
    // In google chrome, the value returned from the file input will be C:\fakepath\filename. This while loop
    // will remove the C:\fakepath\ so that it only displays the file name in the navigation bar.
    var $upload = $(this),
        fullFilePath = $upload.val(),
        fakePathCheck = fullFilePath.search("\\\\") + 1; // 4 \"s enables it to search for a slash character without error

    // fakePathCheck will return -1 when the character is not found, so will only be -1 when all slashes are gone
    while (fakePathCheck != 0) { 
      fullFilePath = fullFilePath.substring(fakePathCheck);
      fakePathCheck = fullFilePath.search("\\\\") + 1;
    }
    reload = ["", ""];

    var formData = new FormData();
    formData.append("file", $upload[0].files[0]);
    loadGrn("/upload", fullFilePath, formData);
    event.preventDefault();
  });

  var previousFile = ["/upload", "", undefined];
  $("#reload").click(function (event) {
    if(!$(".startDisabled").hasClass("disabled")) { 
      if(reload[0] === "") {
        loadGrn(previousFile[0], previousFile[1], previousFile[2]);
      } else {
        loadGrn(reload[0], reload[1]);
      }
    }
  });

  var reload = ["", ""];
  $("#unweighted").click(function (event) {
    loadDemo("/demo/unweighted", "Demo #1: Unweighted GRN (21 genes, 50 edges)");
  });

  $("#weighted").click(function (event) {
    loadDemo("/demo/weighted", "Demo #2: Weighted GRN (21 genes, 50 edges, Dahlquist Lab unpublished data)");
  });

  $("#schadeInput").click(function (event) {
    loadDemo("/demo/schadeInput", "Demo #3: Unweighted GRN (21 genes, 31 edges)");
  });

  $("#schadeOutput").click(function (event) {
    loadDemo("/demo/schadeOutput", "Demo #4: Weighted GRN (21 genes, 31 edges, Schade et al. 2004 data)");
  });

  var loadDemo = function(url, name) {
    loadGrn(url, name);
    reload = [url, name];
    $("#upload").val("");
  };

  $(".deselectedColoring").click(function (event) {
    colorPreferences(event);
  });

  var colorPreferences = function(event) {
    var deselectedID = "#" + $(".deselectedColoring").attr("id");
    var selectedID = "#" + $(".selectedColoring").attr("id");
    $(deselectedID + ">span").attr("class", "glyphicon glyphicon-ok");
    $(selectedID + ">span").attr("class", "glyphicon invisible");
    // Allows the click handler to swap between the two different options
    $(deselectedID).attr("class", "selectedColoring")
                   .off("click");
    $(selectedID).attr("class", "deselectedColoring")
                 .on("click", colorPreferences);
  };

  // Allow the sliders to be used before loading a graph

  $("input[type='range']").on("input", function() {
    // Due to all of the sliders and their HTML values sharing the same naming convention: NameInput/NameVal, 
    // we can remove the Input and replace it with Val to change the correct HTML value each time.
    var selectedSlider = $(this).attr("id").search("Input");
    var targetID = $(this).attr("id").substring(0, selectedSlider) + "Val";
    var gravityCheck = "";
    if(targetID === "gravityVal"  && $(this).val().length === 3) {
      gravityCheck = "0";
    }
    $("#" + targetID).html($(this).val() + gravityCheck);
  });

  // Handler is unbound first to prevent it from firing twice. 
  // addHanders[0][i] = ID; addHandlers[1][i] = function run when that ID is clicked
  var addHandlers = [ 
    [ "#lockSliders", "#lockSlidersMenu", "#resetSliders", "#resetSlidersMenu", "#undoReset", "#undoResetMenu" ],
    [ lockSliders, lockSliders, resetSliders, resetSliders, undoReset, undoReset]
  ]
  for(var i = 0; i < addHandlers[0].length; i++) {
    $(addHandlers[0][i]).unbind("click").click(addHandlers[1][i]);
  };

  function lockSliders(event) {
    if( $("#lockSlidersMenu").attr("class") === "noGlyph" ) {
      $("#lockSliders").prop("checked", true);
      $("#lockSlidersMenu").removeClass("noGlyph")
                             .html("<span class='glyphicon glyphicon-ok'></span>&nbsp; Lock Force Graph Parameters");
    } else {
      $("#lockSliders").prop("checked", false);
      $("#lockSlidersMenu").addClass("noGlyph")
                           .html("<span class='glyphicon invisible'></span>&nbsp; Lock Force Graph Parameters");
    }
    var check = $("#lockSliders").prop("checked");
    $("input[type='range']").prop("disabled", check);
    $("#resetSliders").prop("disabled", check);
  };
  
  // Enter the prefix of each slider here
  var inputs = [ "#linkDist", "#charge", "#gravity", "#chargeDist" ];
  var values = [500, -1000, 1000, 0.1];

  function resetSliders(event) {
    var check = $( "#lockSliders" ).prop( "checked" );
    if( !check ) {
      values = [ $("#linkDistInput").val(), $("#chargeInput").val(), $("#chargeDistInput").val(), $("#gravityInput").val() ];
      for(var i = 0, k = 0; i <  inputs; i = i + 2, k++) {
        $(inputs[i] + "Input").val(values[k]);
        if(inputs[i] != "#gravity") {
          $(inputs[i] + "Val").html(values[k]);
        } else {
          $(inputs[i] + "Val").html(values[k] + "0"); // add 0 to the end of gravity so that it reads 0.10
        }
      }
      $( "#undoReset" ).prop( "disabled", false );
    }
  };

  function undoReset(event) {
    var check =  $( "#undoReset" ).prop( "disabled" );
    // gravityCheck used to add on the zero to 0.1 -> 0.10, 0.2 -> 0.20, etc
    if( !check ) {
      for(var i = 0; i <  inputs; i++) {
        $(inputs[i] + "Input").val(values[k]);
        if(inputs[i] != "#gravity") {
          $(inputs[i] + "Val").html(values[k]);
        } else {
          var gravityCheck = "";
          if( $("#gravityInput").val().length === 3 ) {
            gravityCheck = "0";
          }
          $(inputs[i] + "Val").html(values[k] + gravityCheck); // add 0 to the end of gravity so that it reads 0.10
        }
      }
      $( "#undoReset" ).prop( "disabled", true );
    }
  }
  
  $("#printGraph").click(function (event) {
  if(!$(".startDisabled").hasClass("disabled")) {
    window.print();
  }
});
});
