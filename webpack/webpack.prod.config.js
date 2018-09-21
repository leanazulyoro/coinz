const webpack = require("webpack");
const config = require("./config");
const Copy = require("copy-webpack-plugin");

const staticSuffix = config.build_number ? `-${config.build_number}` : "";

module.exports = {
  mode: 'production',
  entry: {
    main: [
      "babel-polyfill",
      config.paths.client("client.js")
    ]
  },
  output: {
    publicPath: config.compiler_public_path,
    path: config.paths.dist(),
    filename: `[name].bundle${staticSuffix}.js`,
    chunkFilename: `[name].bundle${staticSuffix}.js`
  },
  target: "web",
  node: {
    fs: "empty",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader"
          },
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              hash: "sha512",
              digest: "hex",
              name: "img/[hash].[ext]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: "65-90",
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
          loader: "file-loader",
          options: {
            hash: "sha512",
            digest: "hex",
            name: "fonts/[hash].[ext]"
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(config.globals),
    new Copy([
      {
        from: config.paths.public(),
        to: config.paths.dist()
      }
    ]),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  }
};
