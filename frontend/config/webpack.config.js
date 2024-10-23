const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    // Entry point for the application
    entry: './src/index.js',

    // Output configuration
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      publicPath: '/',
    },

    // Module rules to handle different file types
    module: {
      rules: [
        // CSS loader configuration
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ],
        },
        // Babel loader for JavaScript transpilation
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        // File loader for images and fonts
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
      ],
    },

    // Plugins configuration
    plugins: [
      new CleanWebpackPlugin(), // Cleans the dist folder before each build
      new MiniCssExtractPlugin({
        filename: isProduction ? '[name].[contenthash].css' : '[name].css',
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: isProduction && {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
    ],

    // Development server configuration
    devServer: {
      static: path.resolve(__dirname, '../dist'),
      compress: true,
      port: 3000,
      historyApiFallback: true, // Enables client-side routing support
      hot: true,
    },

    // Source map configuration for easier debugging
    devtool: isProduction ? 'source-map' : 'eval-source-map',

    // Optimization settings
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: 'single',
    },

    // Resolves extensions for JavaScript and React files
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  };
};
 
