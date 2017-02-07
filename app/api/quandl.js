const url = require("url");
const qs = require("querystring");
const express = require("express");
var router = express.Router();

var quandl = require("./request");

router.get("/api/quandl", (req, res) => {
  var code = qs.parse(url.parse(req.url).query).code;
  quandl({ code: code }, function(err, data) {
    if(err) {
      return res.json(err);
    }
    res.json(data);
  });
});

module.exports = function() {
  return router;
};
