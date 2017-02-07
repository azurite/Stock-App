require("dotenv").config({ path: "config/.env" });
const path = require("path");
const express = require("express");
const app = express();

var api = require("./app/api/quandl");
var routes = require("./app/routes");

app.set("port", process.env.PORT || 8124);
app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "client"));

app.use(express.static(path.join(process.cwd(), "build", "client")));
app.use(express.static(path.join(process.cwd(), "client")));

app.use(api());
app.use(routes());

app.listen(app.get("port"), () => {
  console.log("listening on port: " + app.get("port"));
});
