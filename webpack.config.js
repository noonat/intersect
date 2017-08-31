module.exports = {
  entry: './src/examples.ts',
  output: {
      path: __dirname + '/docs',
      filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader'}
    ]
  },
  devtool: 'source-map'
};
