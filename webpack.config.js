const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const atImport = require('postcss-import');
const cssNext = require('postcss-cssnext');

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

const isProd = process.env.NODE_ENV === 'production';

function HashBundlePlugin() {}
HashBundlePlugin.prototype.apply = (compiler) => {
  compiler.plugin('done', (statsData) => {
    const stats = statsData.toJson();

    if (!stats.errors.length) {
      const htmlFileName = 'index.html';
      const htmlIn = fs.readFileSync(resolve(htmlFileName), 'utf8');
      const htmlOut = htmlIn.replace('dist/bundle.js', `bundle.${stats.hash}.js`);

      fs.writeFileSync(resolve(`dist/${htmlFileName}`), htmlOut);
    }
  });
};

const config = {
  entry: './src/main.js',
  output: {
    path: resolve('dist'),
    publicPath: '/dist/',
    filename: `bundle${isProd ? '.[hash]' : ''}.js`
  },
  resolve: {
    extensions: [
      '.js',
      '.vue'
    ],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ]
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        postcss: [
          atImport({
            path: ['src/styles']
          }),
          cssNext()
        ]
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};

if (isProd) {
  config.devtool = '#source-map';

  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HashBundlePlugin()
  ]);
}

module.exports = config;
