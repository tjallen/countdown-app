/* eslint-disable global-require, no-unused-vars */

import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import combineLoaders from 'webpack-combine-loaders';
// import CopyWebpackPlugin from 'copy-webpack-plugin';

// cleaner paths
const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  srcImages: path.join(__dirname, 'src/images'),
  distImages: path.join(__dirname, 'dist/images'),
};

module.exports = {
  entry: {
    src: PATHS.src,
    vendor: [
      'normalize.css',
      'react',
      'react-dom',
    ],
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    // root: path.join(__dirname, 'node_modules'),
    // modulesDirectories: ['node_modules'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new HtmlWebpackPlugin({
      title: 'My app title',
      description: 'My app description',
      template: 'src/index.hbs',
    }),
    new CleanWebpackPlugin([
      PATHS.dist,
    ], {
      verbose: true,
      dry: false,
    }),
/*    new CopyWebpackPlugin([
      { from: 'src/images', to: PATHS.distImages },
    ]),*/
  ],
  module: {
    loaders: [
      {
        test: /\.(css|scss|pcss)$/,
        loader: 'style-loader!css-loader?modules!postcss-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: combineLoaders([
          {
            loader: 'react-hot',
          },
          {
            loader: 'babel',
            query: {
              cacheDirectory: true,
              presets: ['es2015', 'react', 'stage-1'],
              plugins: ['transform-runtime', 'transform-class-properties'],
            },
          },
        ]),
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        loaders: [
          'url?limit=5000&name=images/[name][hash:6].[ext]',
          'image-webpack',
        ],
      },
    ],
  },
  // image-webpack-loader options
  imageWebpackLoader: {
    progressive: true,
    optimizationLevel: 7,
    interlaced: false,
    pngquant: {
      quality: '65-90',
      speed: 4,
    },
    svgo: {
      plugins: [
        {
          removeViewBox: false,
        },
        {
          removeEmptyAttrs: false,
        },
      ],
    },
  },
  postcss() {
    return [
      require('postcss-import')({ addDependencyTo: webpack }),
      require('postcss-url'),
      require('postcss-cssnext'),
      // plugins
      require('postcss-simple-vars'),
      require('postcss-extend'),
      require('postcss-nested'),
      require('postcss-mixins'),
      // reporting
      require('postcss-browser-reporter'),
      require('postcss-reporter'),
    ];
  }
};
