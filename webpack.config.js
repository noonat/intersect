module.exports = {
  entry: './examples.js',
  output: {
      path: __dirname + '/docs',
      filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  devtool: "source-map",
};
