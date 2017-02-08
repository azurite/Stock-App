exports.stocks = function preloadStocks() {
  var data;
  try {
    data = window.__PRELOADED_DATA__;
  }
  catch(e) {
    data = [];
  }

  switch(typeof data) {
    case "string":
      return JSON.parse(data);

    case "object":
      return data;

    default:
      return [];
  }
};

exports.socket = function preloadSocket() {
  var socket = false;
  try {
    socket = window.socket;
  }
  catch(e) {
    try {
      socket = window.io();
      window.socket = socket;
    }
    catch(e) {
      return socket;
    }
  }

  return socket;
};
