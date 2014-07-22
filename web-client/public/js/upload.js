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
        fakePathCheck = fullFilePath.search("\\\\") + 1;

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
});

/*
 * Thanks to http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
 * for helping to resolve this.
 */
