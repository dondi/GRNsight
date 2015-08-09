$(function () {
    var getCount = function (path, callback) {
            $.getJSON("http://grnsight.cs.lmu.edu/server/ga?path=" + path).done(callback);
        },

        setReportResult = function (result) {
            $(".ga-report").text(result);            
        },

        getUploadCount = function () {
            getCount("upload", function (uploadCount) {
                $(".ga-upload").text(uploadCount);
            });
        },

        pathTail = location.pathname.split("/").pop();

    getCount(pathTail, function (pathResult) {
        if (pathTail === "") {
            getCount("index.html", function (indexCount) {
                setReportResult(pathResult + indexResult);
            });

            getUploadCount();
        } else if (pathTail === "index.html") {
            getCount("", function (homeResult) {
                setReportResult(pathResult + homeResult);
            });

            getUploadCount();
        } else if (pathTail === "beta.html") {
            getUploadCount();
        } else {
            setReportResult(pathResult);
        }
    });
});
