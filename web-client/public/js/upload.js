$(function () {
  
  // Style of the tooltips
  $('.info').tooltip({
    placement: 'top',
    delay: { show: 700, hide: 100 }
  });

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
          $("input[type='range'").off("input");
          drawGraph(0, network.genes, network.links, network.positiveWeights, network.negativeWeights, {
            linkSlider: "#linkDistInput",
            chargeSlider: "#chargeInput",
            chargeDistSlider: "#chargeDistInput",
            gravitySlider: "#gravityInput",
            lockSliderCheckbox: "#lockSliders",
            lockSliderMenu: "#lockSlidersMenu",
            resetSliderButton: "#resetSliders",
            resetSliderMenu: "#resetSlidersMenu",
            undoResetButton: "#undoReset",
            undoResetMenu: "#undoResetMenu"
          });
        }).error(function (xhr, status, error) {
          var err = JSON.parse(xhr.responseText);
          $("#error").html(err);
          $("#myModal").modal('show');
        });
      };

  $('#upload').on('change', function (e) {
    // In google chrome, the value returned from the file input will be C:\fakepath\filename. This while loop
    // will remove the C:\fakepath\ so that it only displays the file name in the navigation bar.
    var fullFilePath = $('input[type=file]').val(),
        fakePathCheck = fullFilePath.search("\\\\") + 1; // 4 \'s enables it to search for a slash character without error

    // fakePathCheck will return -1 when the character is not found, so will only be -1 when all slashes are gone
    while (fakePathCheck != 0) { 
      fullFilePath = fullFilePath.substring(fakePathCheck)
      fakePathCheck = fullFilePath.search("\\\\") + 1;
    }

    var formData = new FormData();
    formData.append('file', $('#upload')[0].files[0]);
    loadGrn("/upload", fullFilePath, formData);
    e.preventDefault();
  });

  $('#reload').click(function (event) {
    $('#upload').trigger('change');
  });

  $('#unweighted').click(function (event) {
    loadGrn("/demo/unweighted", "Demo #1: Unweighted GRN");
  });

  $('#weighted').click(function (event) {
    loadGrn("/demo/weighted", "Demo #2: Weighted GRN");
  });

  $("input[type='range'").on('input', function() {
    // Due to all of the sliders and their HTML values sharing the same naming convention: NameInput/NameVal, we can remove
    // the Input and replace it with Val to change the correct HTML value each time.
    var inputStringLocation = $(this).attr("id").search("Input");
    var targetID = $(this).attr("id").substring(0, inputStringLocation) + "Val";
    var gravityCheck = "";
    if(targetID === "gravityVal"  && $(this).val().length === 3) {
      gravityCheck = "0";
    }
    $("#" + targetID).html($(this).val() + gravityCheck);
  })

});

/*
 * Thanks to http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
 * for helping to resolve this.
 */
