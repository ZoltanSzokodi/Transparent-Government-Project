const path = require('path');

module.exports = {
  entry: './JS/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  }
};