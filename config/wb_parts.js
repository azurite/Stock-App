const fs = require("fs");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

exports.devServer = function(options) {
  return {
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: "errors-only",
      host: options.host,
      port: options.port,
      contentBase: options.contentBase
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multistep: true
      })
    ]
  };
};

exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  };
};

exports.deduplicate = function() {
  return {
    plugins: [
      new webpack.optimize.DedupePlugin()
    ]
  };
};

exports.clean = function(options) {
  return {
    plugins: [
      new CleanWebpackPlugin([options.path], {
        root: process.cwd(),
        exclude: options.exclude || []
      })
    ]
  };
};

exports.extractCSS = function(options) {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: "style-loader",
            loader: "css-loader"
          }),
          include: options.include
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin(options.chunkhash ? "[name].[chunkhash].css" : "[name].css")
    ]
  };
};

exports.htmlPlugin = function(options) {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template: options.template
      })
    ]
  };
};

exports.extractBundle = function(options) {
  const entry = {};
  entry[options.name] = options.entries;
  return {
    entry: entry,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, "manifest"]
      })
    ]
  };
};

exports.setFreeVariables = function() {
  return {
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
      })
    ]
  };
};

exports.nodeModules = function() {
  const nodeModules = {};
  fs.readdirSync("node_modules")
    .filter(function(mod) {
      return [".bin"].indexOf(mod) === -1;
    })
    .forEach(function(mod) {
      nodeModules[mod] = "commonjs " + mod;
    });
  return {
    externals: nodeModules
  };
};

exports.pugLoader = function(options) {
  return {
    module: {
      loaders: [
        {
          test: /\.pug$/,
          loaders: ["pug-loader"],
          include: options.include
        },
      ]
    }
  };
};

exports.babelLoader = function(options) {
  return {
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ["babel-loader"],
          include: options.include
        }
      ]
    }
  };
};
