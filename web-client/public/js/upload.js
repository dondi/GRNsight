$(function() {
  $("upload").click(function(){
    $.ajax({
      type: 'POST',
      url: 'localhost:3000/upload',
      data: $('#spreadsheet'),
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    });
  });
});