const React = require("react");
const Axios = require("axios");
const Chart = require("./Chart");
const Stocks = require("./Stocks");

const App = React.createClass({
  propTypes: {
    preloaded: React.PropTypes.array
  },
  getInitialState: function() {
    return {
      input: "",
      error: null,
      lastAdded: null,
      lastRemoved: null,
      stocks: this.props.preloaded || [],
    };
  },
  addStock: function(e) {
    e.preventDefault();
    var self = this;

    Axios.get("/api/quandl?code=" + this.state.input.toUpperCase())
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
