$(function () {
    var getCount = function (path, callback) {
            $.getJSON("http://grnsight.cs.lmu.edu/server/ga?path=" + path).done(callback);
        },

        setReportResult = function (count) {
            $(".ga-report").text(count);            
        },

        getUploadCount = function () {
            getCount("upload", function (uploadCount) {
                $(".ga-upload").text(uploadCount);
            });
        },

        pathTail = location.pathname.split("/").pop();

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
