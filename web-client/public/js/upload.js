$(function() {
  $('form').submit(function(e){
    var formData = new FormData();
    formData.append('file', $('#upload')[0].files[0]);
    
    $.ajax({
      url: 'http://localhost:3000/upload',
      data: formData,
      processData: false,
      contentType: false,
      type: 'POST',
      crossDomain: true,
      success: function (data) {
        console.log(data);
      }
    }).done(function (network) {
      console.log(network.genes);
      drawGraph(network.genes, network.links);
    });
    e.preventDefault();
  });
});

/*
 * Thanks to http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
 * for helping to resolve this.
 */