$(function() {
  var formData = new FormData($('form')[0]);
  $("#upload").click(function(){
    $.ajax({
      url: 'http://localhost:3000/upload',
      type: 'POST',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: function (data) {
        console.log(data);
      },
      data: formData,
      processData: false
      //May need to set the content type, but the multipart/form and application.json
      //aren't working.
    });
  });
});