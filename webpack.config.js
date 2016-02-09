module.exports = {
  context: __dirname,
  entry: "./lib/gameView.js",
  output: {
    path: "./lib",
    filename: "bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js"]
  }
};
