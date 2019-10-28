const path = require('path');

module.exports = {
  entry: './JS/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  }
};