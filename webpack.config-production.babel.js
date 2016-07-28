import WebpackStripLoader from 'strip-loader';
import config from './webpack.config.babel.js';
import webpack from 'webpack';

// define production loaders
const stripLoader = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: WebpackStripLoader.loader('console.log'),
};
// add prod loaders
config.module.loaders.push(stripLoader);

// define and add prod plugins
config.plugins.push(
  // set NODE_ENV environment variable to production
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  // uglify dat js
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false, // avoid getting spammed with warnings about 3rd party libraries
    },
  }),
);

export default config;
