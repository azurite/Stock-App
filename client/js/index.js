const React = require("react");
const ReactDOM = require("react-dom");

const Chart = require("./components/Chart");
const Stocks = require("./components/Stocks");

/*just for testing purposes*/
var initial = {
  aapl: require("./dev/sample_aapl"),
  goog: require("./dev/sample_goog")
};

var addNew = {
  msft: require("./dev/sample_msft")
};

var transform = function(data) {
  var prep = [];
  for(var p in data) {
    if(data.hasOwnProperty(p)) {
      prep.push({
        name: p,
        description: "description comes here",
        data: data[p]
      });
    }
  }

  return prep;
};
/*just for testing purposes end*/

const App = React.createClass({
  getInitialState: function() {
    return {
      input: "",
      lastAdded: null,
      lastRemoved: null,
      stocks: transform(initial)
    };
  },
  addStock: function(e) {
    e.preventDefault();
    
    var newData = {
      name: "msft",
      description: "description comes here",
      data: addNew.msft
    };

    this.setState({
      lastAdded: newData,
      lastRemoved: null,
      stocks: this.state.stocks.concat([newData])
    });
  },
  removeStock: function(name) {
    this.setState({
      lastAdded: null,
      lastRemoved: name,
      stocks: this.state.stocks.filter((stock) => {
        return stock.name !== name;
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

ReactDOM.render(<App/>, document.getElementById("app"));
