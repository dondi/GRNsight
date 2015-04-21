$(function () {
    $.getJSON("http://grnsight.cs.lmu.edu/server/ga?path=" + location.pathname.split("/").pop(), function (result) {
        $(".ga-report").text(result);
        console.log(result);
    });
});