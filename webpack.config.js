const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = (env = {}) => {

  // get environment variables and if NODE_ENV is NOT set the default value
  // would be "development"
  const { NODE_ENV = "development" } = process.env;
  const isProduction = NODE_ENV === 'production'
  const isDevelopment = NODE_ENV === 'development'
  // get environment variables from `.env`
  const prod = dotenv.config().parsed.PROD_SVR
  const dev = dotenv.config().parsed.DEV_SVR
  // set server URL
  const server = isProduction ? prod : dev

  const getStyleLoaders = () => {
    return [
      isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader'
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: 'Hello World',
        buildTime: new Date().toISOString(),
        template: 'public/index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.SRV': JSON.stringify(server)
      })
    ];

    if (isProduction) {
      plugins.push(new MiniCssExtractPlugin({
        filename: 'main-[hash:8].css'
      })
      );
    }

    return plugins;
  };

  return {
    mode: isProduction ? 'production' : isDevelopment && 'development',

    output: {
      filename: isProduction ? 'main-[hash:8].js' : undefined
    },

    module: {
      rules: [

        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },

        // Loading images
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name]-[sha1:hash:7].[ext]'
              }
            }
          ]
        },

        // Loading fonts
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]'
              }
            }
          ]
        },

        // Loading CSS
        {
          test: /\.(css)$/,
          use: getStyleLoaders()
        },

        // Loading SASS/SCSS
        {
          test: /\.(s[ca]ss)$/,
          use: [...getStyleLoaders(), 'sass-loader']
        }

      ]
    },

    plugins: getPlugins(),

    devServer: {
      open: true
    }
  };
};