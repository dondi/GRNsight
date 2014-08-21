$(function () {
  
  // Style of the tooltips
  $('.info').tooltip({
    placement: 'top',
    delay: { show: 700, hide: 100 }
  });

  // Defaults the sliders so that they return to their default values when the page is refreshed
  $( "#linkDistInput" ).val(500);
  $( "#chargeInput" ).val(-1000);
  $( "#chargeDistInput" ).val(1000);
  $( "#gravityInput" ).val(0.1);

  var loadGrn = function (url, name, formData) {
        // The presence of formData is taken to indicate a POST.
        var fullUrl = $("#service-root").val() + url;
        (formData ?
          $.ajax({
            url: fullUrl,
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            crossDomain: true
          }) :
          $.getJSON(fullUrl)
        ).done(function (network) {
          console.log(network);
          $('#fileName').text(name);
          $("input[type='range']").off("input");
          $("#resetSliders").off("click");
          $("#resetSlidersMenu").off("click");
          $("#undoReset").off('click');
          $("#undoResetMenu").off('click');
          drawGraph(network.genes, network.links, network.positiveWeights, network.negativeWeights, {
            linkSlider: "#linkDistInput",
            chargeSlider: "#chargeInput",
            chargeDistSlider: "#chargeDistInput",
            gravitySlider: "#gravityInput",
            resetSliderButton: "#resetSliders",
            resetSliderMenu: "#resetSlidersMenu",
            undoResetButton: "#undoReset",
            undoResetMenu: "#undoResetMenu"
            //lockNodes: "#lockNodes"
          }, network.networkType);
        }).error(function (xhr, status, error) {
          var err = JSON.parse(xhr.responseText);
          $("#upload").val(""); // De-select the bad file.
          $("#error").html(err);
          $("#myModal").modal('show');
        });
      };

  $('#upload').on('change', function (event) {
    // In google chrome, the value returned from the file input will be C:\fakepath\filename. This while loop
    // will remove the C:\fakepath\ so that it only displays the file name in the navigation bar.
    var $upload = $(this),
        fullFilePath = $upload.val(),
        fakePathCheck = fullFilePath.search("\\\\") + 1; // 4 \'s enables it to search for a slash character without error

    // fakePathCheck will return -1 when the character is not found, so will only be -1 when all slashes are gone
    while (fakePathCheck != 0) { 
      fullFilePath = fullFilePath.substring(fakePathCheck)
      fakePathCheck = fullFilePath.search("\\\\") + 1;
    }
    reload = ["", ""];

    var formData = new FormData();
    formData.append('file', $upload[0].files[0]);
    loadGrn("/upload", fullFilePath, formData);
    event.preventDefault();
  });

  $('#reload').click(function (event) {
    if(reload[0] === "") {
      $('#upload').trigger('change');
    } else {
      loadGrn(reload[0], reload[1]);
    }
  });

  var reload = ["", ""];
  $('#unweighted').click(function (event) {
    loadGrn("/demo/unweighted", "Demo #1: Unweighted GRN");
    reload = [ "/demo/unweighted", "Demo #1: Unweighted GRN"];
  });

  $('#weighted').click(function (event) {
    loadGrn("/demo/weighted", "Demo #2: Weighted GRN");
    reload = [ "/demo/weighted", "Demo #2: Weighted GRN"];
  });

  $('.deselectedColoring').click(colorPreferences);

  function colorPreferences (event) {
    var deselectedID = $('.deselectedColoring').attr('id');
    var selectedID = $('.selectedColoring').attr('id');
    $("#" + deselectedID + ">span").attr('class', 'glyphicon glyphicon-ok');
    $("#" + selectedID + ">span").attr('class', 'glyphicon invisible');

    // Allows the click handler to swap between the two different options
    $("#" + deselectedID).attr('class', 'selectedColoring')
                         .off('click');
    $("#" + selectedID).attr('class', 'deselectedColoring')
                       .on('click', colorPreferences);
  }


  /*
     Allow the sliders to be used before loading a graph
  */

  $("input[type='range']").on('input', function() {
    // Due to all of the sliders and their HTML values sharing the same naming convention: NameInput/NameVal, we can remove
    // the Input and replace it with Val to change the correct HTML value each time.
    var inputStringLocation = $(this).attr("id").search("Input");
    var targetID = $(this).attr("id").substring(0, inputStringLocation) + "Val";
    var gravityCheck = "";
    if(targetID === "gravityVal"  && $(this).val().length === 3) {
      gravityCheck = "0";
    }
    $("#" + targetID).html($(this).val() + gravityCheck);
  });

  // Handler is unbound first to prevent it from firing twice.
  $("#lockSliders").unbind('click').click(lockSliders);
  $("#lockSlidersMenu").unbind('click').click(lockSliders);
  $("#resetSliders").unbind('click').click(resetSliders);
  $("#resetSlidersMenu").unbind('click').click(resetSliders);
  $("#undoReset").unbind('click').click(undoReset);
  $("#undoResetMenu").unbind('click').click(undoReset);
  var allDefaults = [ $("#linkDistInput").val(), $("#chargeInput").val(), $("#chargeDistInput").val(), $("#gravityInput").val() ];

  function lockSliders(event) {
    if( $("#lockSlidersMenu").attr('class') === 'noGlyph' ) {
      $("#lockSliders").prop('checked', true);
      $("#lockSlidersMenu").removeClass('noGlyph')
                             .html("<span class='glyphicon glyphicon-ok'></span>&nbsp; Lock Force Graph Parameters");
    } else {
      $("#lockSliders").prop('checked', false);
      $("#lockSlidersMenu").addClass('noGlyph')
                             .html("<span class='glyphicon invisible'></span>&nbsp; Lock Force Graph Parameters");
    }
    var check = $("#lockSliders").prop('checked');
    $("input[type='range']").prop('disabled', check);
    $("#resetSliders").prop('disabled', check);
  }

  function resetSliders(event) {
      var check = $( "#lockSliders" ).prop( 'checked' );
      if( !check ) {
        allDefaults = [ $("#linkDistInput").val(), $("#chargeInput").val(), $("#chargeDistInput").val(), $("#gravityInput").val() ];
        $( "#linkDistInput" ).val(500);
        $( "#linkDistVal" ).html("500");
        $( "#chargeInput" ).val(-1000);
        $( "#chargeVal" ).html("-1000");
        $( "#gravityInput" ).val(0.1);
        $( "#gravityVal" ).html("0.10");
        $( "#chargeDistInput" ).val(1000);
        $( "#chargeDistVal" ).html("1000");
        $( "#undoReset" ).prop( 'disabled', false );
      }
    }

    function undoReset(event) {
      var check =  $( "#undoReset" ).prop( 'disabled' );
      // gravityCheck used to add on the zero to 0.1 -> 0.10, 0.2 -> 0.20, etc
      var gravityCheck = "";
      if( !check ) {
        $( "#linkDistInput" ).val( allDefaults[0] );
        $( "#linkDistVal" ).html( allDefaults[0] );
        $( "#chargeInput" ).val( allDefaults[1] );
        $( "#chargeVal" ).html( allDefaults[1] );
        $( "#gravityInput" ).val( allDefaults[3] );
        if( $("#gravityInput").val().length === 3 ) {
          gravityCheck = "0";
        }
        $( "#gravityVal" ).html( allDefaults[3] + gravityCheck );
        $( "#chargeDistInput" ).val( allDefaults[2] );
        $( "#chargeDistVal" ).html( allDefaults[2] );
        $( "#undoReset" ).prop( 'disabled', true );
      }
    }

});

$("#printGraph").click(function (event) {
  window.print();
});

/*
 * Thanks to http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
 * for helping to resolve this.
 */
