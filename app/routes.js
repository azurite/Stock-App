const React = require("react");
const { renderToString } = require("react-dom/server");
const async = require("async");
const express = require("express");
var router = express.Router();

var quandl = require("./api/quandl");
var App = require("../client/js/components/App");

var assets = require("./serve_bundles")({
  root: process.cwd(),
  path: "/build/client",
  publicPath: "/",
  sort: {
    scripts: ["manifest", "vendor", "style", "app"]
  }
});

router.get("*",
(req, res, next) => {
  req.db.smembers("stocks", function(err, members) {
    if(err) {
      return next();
    }
    async.map(
      members,
      function(code, next) {
        quandl({ code: code }, next);
      },
      function(err, result) {
        if(err) {
          req.preloadedData = [];
          return next();
        }
        req.preloadedData = result;
        next();
      }
    );
  });
},
(req, res) => {
  var html = renderToString(<App/>);
  res.render("index", {
    app: html,
    assets: assets,
    preload: req.preloadedData
  });
});

module.exports = function() {
  return router;
};
