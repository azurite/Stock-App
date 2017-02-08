module.exports = function(client) {
  return function(req, res, next) {
    if(client.connected) {
      req.db = client;
      next();
    }
    else {
      client.on("ready", function() {
        req.db = client;
        next();
      });
    }
  };
};
