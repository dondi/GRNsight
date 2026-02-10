$(function () {
    var getCount = function (path, callback) {
        $.getJSON("https://grnsight.lmucs.org/server/ga?path=" + path).done(callback);
    };

    var setReportResult = function (count) {
        $(".ga-report").text(count);
    };

    var getUploadCount = function () {
        getCount("upload", function (uploadCount) {
            $(".ga-upload").text(uploadCount);
        });
    };

    var pathTail = location.pathname.split("/").pop();

    getCount(pathTail, function (pathCount) {
        if (pathTail === "") {
            getCount("index.html", function (indexCount) {
                setReportResult(pathCount + indexCount);
            });
        } else if (pathTail === "index.html") {
            getCount("", function (homeCount) {
                setReportResult(pathCount + homeCount);
            });
        } else {
            setReportResult(pathCount);
        }

        if (pathTail === "" || pathTail === "index.html" || pathTail === "beta.html") {
            getUploadCount();
        }
    });
});
