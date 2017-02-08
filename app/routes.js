const React = require("react");
const { renderToString } = require("react-dom/server");
const express = require("express");
var router = express.Router();

var quandl = require("./api/request");
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
  quandl({ code: "FB" }, function(err, data) {
    if(err) {
      res.send(err);
    }
    else {
      var html = renderToString(<App/>);
      res.render("index", { app: html, assets: assets, preload: [data] });
    }
  });
  //var html = renderToString(<App/>);
  //res.render("index", { app: html, assets: assets });
});

module.exports = function() {
  return router;
};
