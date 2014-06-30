$(function () {

  $('#upload').on('change', function(e){

    // In google chrome, the value returned from the file input will be C:\fakepath\filename. This while loop
    // will remove the C:\fakepath\ so that it only displays the file name in the navigation bar.
    var fullFilePath = $('input[type=file]').val()
    var fakePathCheck = fullFilePath.search("\\\\") + 1;
    while( fakePathCheck != 0 ) {
      fullFilePath = fullFilePath.substring(fakePathCheck)
      fakePathCheck = fullFilePath.search("\\\\") + 1;
    }
    $('#fileName').html( fullFilePath );

    var formData = new FormData();
    formData.append('file', $('#upload')[0].files[0]);
    
    $.ajax({
      url: 'http://grnsight.cs.lmu.edu:4000/upload', // TODO Read from config 
      data: formData,
      processData: false,
      contentType: false,
      type: 'POST',
      crossDomain: true,
      success: function (data) {
        console.log(data);
      }
    }).done(function (network) {
      drawGraph(0, network.genes, network.links, network.positiveWeights, network.negativeWeights, {
        linkSlider: "#linkDistInput",
        chargeSlider: "#chargeInput",
        chargeDistSlider: "#chargeDistInput",
        gravitySlider: "#gravityInput",
        lockSliderCheckbox: "#lockSliders",
        resetSliderButton: "#resetSliders",
        undoResetButton: "#undoReset"
      });
    }).error( function(xhr, status, error) {
      var err = JSON.parse(xhr.responseText);
      $( "#error" ).html(err);
      $( "#myModal" ).modal('show');
    });
    e.preventDefault();
  });

  $('#reload').on('click', function() {
    $('#upload').trigger('change');
  })

});

/*
 * Thanks to http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
 * for helping to resolve this.
 */