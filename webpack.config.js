const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const DEV_MODE = process.env.NODE_ENV !== 'production'
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const sourceDir = process.env.SOURCE || 'app';
const publicPath = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/');
const startupPath = path.join(process.cwd(), sourceDir, 'startup.tsx');
const outputPath = path.join(process.cwd(), 'public');

const plugins = [
  new MiniCssExtractPlugin({
    filename: DEV_MODE ? '[name].css' : '[name].[hash].css',
    chunkFilename: DEV_MODE ? '[id].css' : '[id].[hash].css',
  }),
  new HtmlWebpackPlugin({
    title: 'DnD Map App',
    template: './public/index.html'
  }),
  new webpack.ProgressPlugin(),
  new webpack.DefinePlugin({
    NODE_ENV: process.env.NODE_ENV,
    PUBLIC_PATH: publicPath.replace(/\/$/, ''),
  }),
];

if (DEV_MODE) {
  // only enable fast refresh in development
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode: DEV_MODE ? 'development' : 'production',

  entry: [
    startupPath,
  ],

  optimization: {
    runtimeChunk: 'single',
    // Ensure `react-refresh/runtime` is hoisted and shared
    // Could be replicated via a vendors chunk
    splitChunks: {
      chunks: 'all',
      name(_, __, cacheGroupKey) {
        return cacheGroupKey;
      },
      cacheGroups: {
        styles: {
          name: "styles",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },

  output: {
    path: outputPath,
    publicPath,
    filename: DEV_MODE ? '[name].js' : '[name].[hash].js',
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.html$/i,
        exclude: /node_modules/,
        loader: "html-loader",
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: 'graphql-tag/loader',
      },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_module/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [
                [
                  "@babel/preset-env",
                  { targets: { browsers: "last 2 versions" } } // or whatever your project requires
                ],
                "@babel/preset-typescript",
                "@babel/preset-react"
              ],
              plugins: [
                // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
                ["@babel/plugin-proposal-private-methods", { loose: true }],
                ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
                DEV_MODE && 'react-refresh/babel',
              ].filter(Boolean),
            },
          },
        ]
      },
      {
        test: /\.(png|jpe?g|svg|woff2?|ttf|eot)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000
            }
          }
        ]
      },
    ],
  },

  plugins,

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.png', '.css', '.scss', '.jpg', '.graphql', '.gql'],
    modules: [
      './app/components',
      'node_modules',
      sourceDir,
    ],
    alias: {
      "components": path.resolve(__dirname, 'app/components'),
      // "graphql": path.resolve(__dirname, "app/graphql"),
      // "types": path.resolve(__dirname, "app/graphql/types"),
      // "hooks": path.resolve(__dirname, "app/hooks"),
      "@app": path.resolve(__dirname, "app"),
    }
  },

  stats: 'normal', // summary,

  performance: {
    // hints: 'warning',
  },

  devServer: {
    hot: true,
    compress: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    static: {
      directory: outputPath,
      watch: false,
    },
    client: {
      overlay: true,
      progress: false,
      reconnect: 5,
      logging: 'info',
    },
    host,
    port,
  },
};
