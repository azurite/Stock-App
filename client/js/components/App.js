const React = require("react");
const Chart = require("./Chart");
const Stocks = require("./Stocks");
const preloadStocks = require("./utils/preload").stocks;

const App = React.createClass({
  componentDidMount: function() {
    var socket = this.socket = window.io();

    socket.on("add", this.add);
    socket.on("remove", this.remove);
    socket.on("api_error", this.api_error);
    socket.on("db_error", this.db_error);
  },
  getInitialState: function() {
    return {
      input: "",
      error: null,
      lastAdded: null,
      lastRemoved: null,
      stocks: preloadStocks(),
    };
  },
  add: function(stock) {
    this.setState({
      input: "",
      error: null,
      lastAdded: stock,
      lastRemoved: null,
      stocks: this.state.stocks.concat([stock])
    });
  },
  addStock: function(e) {
    e.preventDefault();

    if(this.state.stocks.find((s) => { return s.code === this.state.input.toUpperCase(); })) {
      this.setState({
        input: ""
      });
      return;
    }

    this.socket.emit("add", this.state.input);
  },
  remove: function(code) {
    this.setState({
      error: null,
      lastAdded: null,
      lastRemoved: code,
      stocks: this.state.stocks.filter((stock) => {
        return stock.code !== code;
      })
    });
  },
  removeStock: function(code) {
    this.remove(code);
    this.socket.emit("remove", code);
  },
  api_error: function(err) {
    this.setState({
      input: "",
      error: err
    });
  },
  db_error: function(err) {
    err.message = err.message || "database error. Please try again later";
    this.setState({
      error: err
    });
  },
  handleInput: function(e) {
    this.setState({ input: e.target.value.trim() });
  },
  render: function() {
    return (
      <div>
        <Chart
          data={this.state.stocks}
          add={this.state.lastAdded}
          remove={this.state.lastRemoved}
        />
        <Stocks
          error={this.state.error}
          input={this.state.input}
          stocks={this.state.stocks}
          add={this.addStock}
          remove={this.removeStock}
          onChange={this.handleInput}
        />
      </div>
    );
  }
});

module.exports = App;
