module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("upload", {
            title: "Upload",
            serviceRoot: app.get("serviceRoot"),
        });
    });

    app.get("/graph", function (req, res) {
        res.header("Access-Control-Allow-Origin", "https://localhost:3000");
        res.render("graph", { title: "Graph" });
    });

    app.get("/info", function (req, res) {
        res.render("info", { title: "Info", serviceRoot: app.get("serviceRoot") });
    });
};
