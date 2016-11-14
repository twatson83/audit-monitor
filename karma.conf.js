var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],

    client: {
      chai: {
        includeStack: true
      }
    },

    usePolling: true,

    // list of files / patterns to load in the browser
    files: [
      'client/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'client/**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: {
      resolve: {
        cache: false
      },
      cache: false,
      watch: true,
      devtool: 'inline-source-map',
      plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('style.css', {
          allChunks: true
        })
      ],
      output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
      },
      module: {
        loaders: [
          //{ test: /sinon.*\.js$/,                loader: "imports?define=>false,require=>false" }
          {
          test: /\.js$/,
          loaders: [ 'babel' ],
          exclude: /node_modules/,
          include: __dirname
        }, {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css!sass')
        }, {
          test: /\.(woff|woff2|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
          loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
        },
          {
            test: /\.json$/,
            loader: 'json',
          }]
      },
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react/addons': true
      }
    },

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9889,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    plugins: [
      'karma-sinon',
      'karma-chai',
      'karma-mocha',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-jsdom-launcher',
      'karma-chrome-launcher'
    ]
  })
}
