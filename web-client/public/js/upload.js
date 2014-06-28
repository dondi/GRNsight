$(function () {
    // Style.
    $("input[type=file]").bootstrapFileInput();

  $('#upload').change(function(e){
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
});

/*
 * Thanks to http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
 * for helping to resolve this.
 */