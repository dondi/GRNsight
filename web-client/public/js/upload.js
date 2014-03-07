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
      
      
      //May need to set the content type, but the multipart/form and application.json
      //aren't working.
    }).done(function (network) {
      console.log(network.genes);
    });
    e.preventDefault();
  });
});