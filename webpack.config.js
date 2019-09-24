const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  devtool: isProduction ? false : "source-map",
  entry: path.join(__dirname, "src", "examples.ts"),
  mode: isProduction ? "production" : "development",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: { compilerOptions: { sourceMap: !isProduction } }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: "url-loader",
        options: {
          limit: 8192
        }
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/docs")
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};
