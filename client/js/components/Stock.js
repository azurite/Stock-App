const React = require("react");

const Stock = function(props) {
  return (
      <div style={{ border: "1px solid #000" }}>
        <p>{props.code}</p>
        <p>{props.name}</p>
        <button onClick={props.remove.bind(null, props.code)}>Remove</button>
      </div>
  );
};

Stock.propTypes = {
  name: React.PropTypes.string,
  code: React.PropTypes.string,
  remove: React.PropTypes.func.isRequired
};

module.exports = Stock;
