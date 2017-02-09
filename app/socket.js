const quandl = require("./api/quandl");

module.exports = function configureSocket(io, client) {
  function init() {
    io.on("connection", function(socket) {

      socket.on("add", function(code) {
        quandl({ code: code }, function(err, stock) {
          if(err) {
            socket.emit("api_error", err);
            return;
          }
          client.sadd("stocks", code.toLowerCase(), function(err) {
            if(err) {
              socket.emit("db_error", err);
              return;
            }
            io.emit("add", stock);
          });
        });
      });

      socket.on("remove", function(code) {
        client.srem("stocks", code.toLowerCase(), function(err) {
          if(err) {
            socket.emit("db_error", err);
            return;
          }
          socket.broadcast.emit("remove", code);
        });
      });
    });
  }
  if(client.connected) {
    init();
  }
  else {
    client.on("ready", function() {
      init();
    });
  }
};
