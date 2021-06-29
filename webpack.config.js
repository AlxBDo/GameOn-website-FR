const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    app: "./js/modal.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};