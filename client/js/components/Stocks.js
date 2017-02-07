const React = require("react");
const Stock = require("./Stock");

const Stocks = React.createClass({
  propTypes: {
    input: React.PropTypes.string.isRequired,
    stocks: React.PropTypes.array.isRequired,
    add: React.PropTypes.func.isRequired,
    remove: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.props.add}>
          <input
            type="text"
            placeholder="stock code"
            value={this.props.input}
            onChange={this.props.onChange}
          />
          <input type="submit" value="Add"/>
        </form>
        {this.props.stocks.map((stock, i) => {
          return (
            <Stock
              key={i}
              name={stock.name}
              code={stock.code}
              remove={this.props.remove}
            />
          );
        })}
      </div>
    );
  }
});

module.exports = Stocks;
