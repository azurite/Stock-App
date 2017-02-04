const React = require("react");
const ReactDOM = require("react-dom");

const Main = React.createClass({
  render: function() {
    return (
      <h1>Hello world</h1>
    );
  }
});

ReactDOM.render(<Main/>, document.getElementById("app"));
