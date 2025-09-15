// GRNsight web client

var express = require("express");
var http = require("http");
var path = require("path");
var stylus = require("stylus");
var morgan = require("morgan");
var methodOverride = require("method-override");
var serveStatic = require("serve-static");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");

var env = process.env.NODE_ENV || "development";
var config = require("./config/config")[env];
var app = express();

app.set("port", process.env.PORT || config.port || 3001);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
// app.use(express.cookieSession());
app.use(stylus.middleware(path.join(__dirname, "public")));
app.use(serveStatic(path.join(__dirname, "public")));

if (app.get("env") === "development") {
    app.use(errorHandler());
}

app.set("serviceRoot", config.serviceRoot);
console.log("Web service root: " + app.get("serviceRoot"));

require("./controllers/main")(app);

// Don't start the server if this app is run as a child process.
if (!module.parent) {
    http.createServer(app).listen(app.get("port"), function () {
        console.log(
            "GRNsight classic web client running on port %s, environment=%s",
            app.get("port"),
            env
        );
    });
} else {
    module.exports = app;
}
