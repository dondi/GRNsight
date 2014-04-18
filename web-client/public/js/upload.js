$(function () {
    // Style.
    $("input[type=file]").bootstrapFileInput();

  $('form').submit(function(e){
    var formData = new FormData();
    formData.append('file', $('#upload')[0].files[0]);
    
    $.ajax({
      url: 'http://grnsight.cs.lmu.edu:3000/upload', // TODO Read from config
      data: formData,
      processData: false,
      contentType: false,
      type: 'POST',
      crossDomain: true,
      success: function (data) {
        console.log(data);
      }
    }).done(function (network) {
      drawGraph(network.genes, network.links, network.positiveWeights, network.negativeWeights, {
        linkSlider: "#linkDistInput",
        chargeSlider: "#chargeInput",
        chargeDistSlider: "#chargeDistInput"
      });
    });
    e.preventDefault();
  });
});

/*
 * Thanks to http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
 * for helping to resolve this.
 */
