const React = require("react");
const { Col, Button } = require("react-bootstrap");

const Stock = function(props) {
  return (
      <Col className="stock" sm={6} xs={10} smOffset={3} xsOffset={1}>
        <Button className="close" onClick={props.remove.bind(null, props.code)}>
          <span>&times;</span>
        </Button>
        <p className="stock-code">{props.code}</p>
        <p>{props.name}</p>
      </Col>
  );
};

Stock.propTypes = {
  name: React.PropTypes.string,
  code: React.PropTypes.string,
  remove: React.PropTypes.func.isRequired
};

module.exports = Stock;
