const React = require("react");
const { Row, Col, Form, Button, InputGroup, FormGroup, FormControl } = require("react-bootstrap");
const Stock = require("./Stock");

const Stocks = React.createClass({
  propTypes: {
    error: React.PropTypes.object,
    input: React.PropTypes.string.isRequired,
    stocks: React.PropTypes.array.isRequired,
    add: React.PropTypes.func.isRequired,
    remove: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired
  },
  render: function() {
    var error = this.props.error;
    return (
      <Row>
        <Col className="add-stocks" sm={6} xs={10} smOffset={3} xsOffset={1}>
          <Form horizontal onSubmit={this.props.add}>
            <FormGroup>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="stock code"
                  value={this.props.input}
                  onChange={this.props.onChange}
                />
                <InputGroup.Button>
                  <Button bsStyle="success" type="submit">Add</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </Form>
          {error && <span className="err-msg">{error.message}</span>}
        </Col>
        <Row>
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
        </Row>
      </Row>
    );
  }
});

module.exports = Stocks;
