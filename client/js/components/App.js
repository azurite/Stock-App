const React = require("react");
const Axios = require("axios");
const Chart = require("./Chart");
const Stocks = require("./Stocks");

function preloadState() {
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
}

const App = React.createClass({
  getInitialState: function() {
    return {
      input: "",
      error: null,
      lastAdded: null,
      lastRemoved: null,
      stocks: preloadState(),
    };
  },
  addStock: function(e) {
    e.preventDefault();
    var self = this;

    if(this.state.stocks.find((s) => { return s.code === this.state.input.toUpperCase(); })) {
      this.setState({
        input: ""
      });
      return;
    }

    Axios.get("/api/quandl?code=" + this.state.input)
    .then((res) => {
      if(res.data.error) {
        self.setState({
          input: "",
          error: res.data.error
        });
        return;
      }

      self.setState({
        input: "",
        error: null,
        lastAdded: res.data,
        lastRemoved: null,
        stocks: self.state.stocks.concat([res.data])
      });
    })
    .catch((err) => {
      self.setState({
        error: err
      });
    });
  },
  removeStock: function(code) {
    this.setState({
      error: null,
      lastAdded: null,
      lastRemoved: code,
      stocks: this.state.stocks.filter((stock) => {
        return stock.code !== code;
      })
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
