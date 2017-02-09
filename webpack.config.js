const path = require("path");
const merge = require("webpack-merge");
const validate = require("webpack-validator");
const parts = require("./config/wb_parts.js");

const vendors = [
  "react",
  "react-dom",
  "react-bootstrap"
];

const PATHS = {
  app: path.join(__dirname, "client", "js"),
  style: path.join(__dirname, "client", "css", "index.css"),
  template: path.join(__dirname, "client", "index.pug"),
  client: path.join(__dirname, "client"),
  backend: path.join(__dirname, "app"),
  main: path.join(__dirname, "server.js"),
  contentBase: path.join(__dirname, "build", "client"),
  build: {
    client: path.join(__dirname, "build", "client"),
    server: path.join(__dirname, "build", "server")
  }
};

const common = {
  entry: {
    app: PATHS.app,
    style: PATHS.style
  },
  output: {
    path: PATHS.build.client,
    publicPath: "/",
    filename: "[name].js"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".*", ".js", ".jsx"]
  }
};

var config = {};

switch(process.env.npm_lifecycle_event) {
  case "dev-server":
    config = merge(
      common,
      parts.htmlPlugin({ template: PATHS.template }),
      parts.extractBundle({ name: "vendor", entries: vendors }),
      parts.pugLoader({ include: PATHS.client }),
      parts.babelLoader({ include: PATHS.app }),
      parts.extractCSS({ include: PATHS.style, chunkhash: false }),
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
        contentBase: PATHS.contentBase
      })
  );
    break;

  case "build:client":
    config = merge(
      common,
      {
        output: {
          filename: "[name].[chunkhash].js",
          chunkFilename: "[chunkhash].js"
        }
      },
      parts.clean({ path: PATHS.build.client, exclude: ["media"] }),
      parts.extractBundle({ name: "vendor", entries: vendors }),
      //parts.setFreeVariables(),
      parts.deduplicate(),
      parts.minify(),
      parts.pugLoader({ include: PATHS.client }),
      parts.babelLoader({ include: PATHS.app }),
      parts.extractCSS({ include: PATHS.style, chunkhash: true })
    );
    break;

  case "build:client:dev":
    config = merge(
      common,
      {
        output: {
          filename: "[name].[chunkhash].js",
          chunkFilename: "[chunkhash].js"
        }
      },
      parts.clean({ path: PATHS.build.client, exclude: ["media"] }),
      parts.extractBundle({ name: "vendor", entries: vendors }),
      parts.pugLoader({ include: PATHS.client }),
      parts.babelLoader({ include: PATHS.app }),
      parts.extractCSS({ include: PATHS.style, chunkhash: true })
    );
    break;

  case "build:server":
    config = merge(
      common,
      {
        entry: PATHS.main,
        target: "node",
        output: {
          path: PATHS.build.server,
          filename: "backend.js"
        }
      },
      parts.clean({ path: PATHS.build.server, exclude: ["media"] }),
      parts.nodeModules(),
      //parts.setFreeVariables(),
      parts.deduplicate(),
      parts.minify(),
      parts.babelLoader({ include: [PATHS.app, PATHS.main, PATHS.backend] })
    );
    break;

  case "build:server:dev":
    config = merge(
      common,
      {
        entry: PATHS.main,
        target: "node",
        output: {
          path: PATHS.build.server,
          filename: "backend.js"
        }
      },
      parts.clean({ path: PATHS.build.server, exclude: ["media"] }),
      parts.nodeModules(),
      parts.babelLoader({ include: [PATHS.app, PATHS.main, PATHS.backend] })
    );
    break;

  default:
    config = common;
    console.log("!Warning! default case has been triggerd by npm cmd: " + process.env.npm_lifecycle_event);
    break;
}

module.exports = validate(config, { quiet: true });
