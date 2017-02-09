const React = require("react");
const { Row, Col } = require("react-bootstrap");
const options = require("./options/chart_options");
const Highstock = require("highcharts/highstock");

const Chart = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    add: React.PropTypes.object,
    remove: React.PropTypes.string,
  },
  formatStocks: function() {
    return this.props.data.map((stock) => {
      return this.formatSingle(stock);
    });
  },
  formatSingle: function(stock) {
    return {
      name: stock.code,
      data: stock.data,
      tooltip: {
        valueDecimals: 2
      }
    };
  },
  componentDidMount: function() {
    Highstock.setOptions(options.theme);
    this.chart = Highstock.stockChart({
      chart: {
        renderTo: "stock-container"
      },
      rangeSelector: {
        selected: 1
      },
      title: {
        text: "Stock Prices"
      },
      series: this.formatStocks()
    });
  },
  shouldComponentUpdate: function(nextProps) {
    return nextProps.data.length !== this.props.data.length;
  },
  componentDidUpdate: function() {
    var series = this.chart.series;
    var remove = this.props.remove;
    var add = this.props.add;
    var i = series.length;

    if(add) {
      var alreadyPresent = false;
      while(i--) {
        if(series[i].name === add.code) {
          alreadyPresent = true;
          break;
        }
      }
      if(!alreadyPresent) {
        this.chart.addSeries(this.formatSingle(add));
      }
      i = series.length;
    }

    if(remove) {
      while(i--) {
        if(series[i].name === remove) {
          series[i].remove();
        }
      }
    }

    this.chart.redraw();
  },
  render: function() {
    return (
      <Row>
        <Col xs={12}>
          <div id="stock-container"/>
        </Col>
      </Row>
    );
  }
});

module.exports = Chart;
