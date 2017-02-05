const React = require("react");

const Stock = function(props) {
  return (
      <div style={{ border: "1px solid #000" }}>
        <p>{props.name}</p>
        <p>{props.desc}</p>
        <button onClick={props.remove.bind(null, props.name)}>Remove</button>
      </div>
  );
};

Stock.propTypes = {
  name: React.PropTypes.string,
  desc: React.PropTypes.string,
  remove: React.PropTypes.func.isRequired
};

module.exports = Stock;
