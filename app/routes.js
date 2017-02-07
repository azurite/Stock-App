const React = require("react");
const { renderToString } = require("react-dom/server");
const express = require("express");
var router = express.Router();

var App = require("../client/js/components/App");

var assets = require("./serve_bundles")({
  root: process.cwd(),
  path: "/build/client",
  publicPath: "/",
  sort: {
    scripts: ["manifest", "vendor", "style", "app"]
  }
});

router.get("*", (req, res) => {
  var html = renderToString(<App/>);
  res.render("index", { app: html, assets: assets });
});

module.exports = function() {
  return router;
};
