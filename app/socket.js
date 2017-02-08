const quandl = require("./api/request");

module.exports = function configureSocket(io) {
  io.on("connection", function(socket) {

    socket.on("add", function(code) {
      quandl({ code: code }, function(err, stock) {
        if(err) {
          socket.emit("api_error", err);
          return;
        }
        //database operation here db("add")
        io.emit("add", stock);
      });
    });

    socket.on("remove", function(code) {
      //database operation here db("remove")
      socket.broadcast.emit("remove", code);
    });
  });
};
