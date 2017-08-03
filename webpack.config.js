const webpack = require('webpack');
const path = require('path');

const mainPath = path.resolve(__dirname, 'client/main.jsx');
const componentsPath = path.resolve(__dirname, 'client/components');
const outputPath = path.resolve(__dirname, 'client/compiled');


const config = {
  entry: [mainPath, componentsPath + '/App.jsx'],

  output: {
    path: outputPath,
    filename: 'index.js'
  },

  devServer: {
    inline: true,
    port: 3030
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};

module.exports = config;
