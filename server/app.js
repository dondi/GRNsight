// Based on the server app for github.com/rtoal/chuzr
var express = require("express");
var http = require("http");
var cors = require("cors");
var morgan = require("morgan");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");

console.log("Configuring GRNsight server");

var env = process.env.NODE_ENV || "development";
var config = require("./config/config")[env];
var app = express();

app.set("port", process.env.PORT || config.port || 3000);
app.use(morgan("dev"));
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(methodOverride());
app.use(cors());

app.set("env", env);
app.set("corsOrigin", config.corsOrigin);

const allowedOrigins = Array.isArray(app.get("corsOrigin"))
    ? app.get("corsOrigin")
    : [app.get("corsOrigin")];

app.use(
    cors({
        origin: function (origin, callback) {
            // Don't allow requests with no origin (e.g., Postman, curl)
            if (!origin) return callback(new Error("Request not allowed by CORS"));

            if (allowedOrigins.includes(origin)) {
                // Only allow requests from allowed origins
                return callback(null, true);
            } else {
                console.warn(`CORS blocked for origin: ${origin}`);
                return callback(new Error("Not allowed by CORS"));
            }
        },
    })
);

console.log("CORS host: %s", app.get("corsOrigin"));

// Load controllers.
require(__dirname + "/controllers/spreadsheet-controller")(app);
require(__dirname + "/controllers/export-controller")(app);
require(__dirname + "/controllers/import-controller")(app);
// require(__dirname + "/controllers/ga-controller")(app);
require(__dirname + "/controllers/api-controllers")(app);
require(__dirname + "/controllers/expression-database-controller")(app);
require(__dirname + "/controllers/network-database-controller")(app);
require(__dirname + "/controllers/protein-database-controller")(app);
require(__dirname + "/controllers/custom-workbook-controller")(app);
require(__dirname + "/controllers/grnsettings-database-controller")(app);

// Don"t start the server if this app is run as a child process.
if (!module.parent) {
    http.createServer(app).listen(app.get("port"), function () {
        console.log(
            "GRNsight server running on port %s, environment=%s",
            app.get("port"),
            app.get("env")
        );
    });
} else {
    module.exports = app;
}
