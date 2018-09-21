const config = require('./config');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {

  mode: 'production',

  entry: {
    server: ['babel-polyfill', config.paths.server('server.js')]
  },

  output: {
    filename: 'server.js',
    path: config.paths.dist(),
    publicPath: config.compiler_public_path
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true,
    fs: 'empty'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: 'img/[hash].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              webp: {
                quality: 75
              },
              svgo: {
                plugins: [
                  {
                    removeViewBox: false
                  },
                  {
                    removeEmptyAttrs: false
                  }
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            hash: 'sha512',
            digest: 'hex',
            name: 'fonts/[hash].[ext]'
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin(config.globals)
  ],
  externals: [nodeExternals()]
};
