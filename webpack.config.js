const path = require('path');

module.exports = {
  entry: './JS/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  }
};