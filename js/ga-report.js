$(function () {
    $.getJSON("http://grnsight.cs.lmu.edu/server/ga?path=" + location.pathname.split("/").pop(), function (result) {
    	if(location.pathname.split("/").pop() === "") {
    		$.getJSON("http://grnsight.cs.lmu.edu/server/ga?path=index.html", function (result2) {
    			$(".ga-report").text(result + result2);
    		})
            $.getJSON("http://grnsight.cs.lmu.edu/server/ga?path=upload"), function (uploadCount) {
                $(".ga-upload").text(uploadCount);
            })
    	} else if(location.pathname.split("/").pop() === "index.html") {
    		$.getJSON("http://grnsight.cs.lmu.edu/server/ga?path=", function (result2) {
    			$(".ga-report").text(result + result2)
    		})
            $.getJSON("http://grnsight.cs.lmu.edu/server/ga?path=upload"), function (uploadCount) {
                $(".ga-upload").text(uploadCount);
            })
    	} else {
    		$(".ga-report").text(result);
    	}
        if(location.pathname.split("/").pop() === "beta.html") {
            $.getJSON("http://grnsight.cs.lmu.edu/server/ga?path=upload"), function (uploadCount) {
                $(".ga-upload").text(uploadCount);
            })
        }
    });
});