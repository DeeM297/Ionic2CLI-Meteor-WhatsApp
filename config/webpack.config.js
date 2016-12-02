var path = require('path');
var webpack = require('webpack');

var ionicWebpackFactoryPath = path.join(process.env.IONIC_APP_SCRIPTS_DIR, 'dist', 'webpack', 'ionic-webpack-factory.js');
var ionicWebpackFactory = require(ionicWebpackFactoryPath);

function getEntryPoint() {
  if (process.env.IONIC_ENV === 'prod') {
    return '{{TMP}}/app/main.prod.js';
  }
  return '{{SRC}}/app/main.dev.ts';
}

//NEW IONIC VERSION
/*
function getPlugins() {
  if (process.env.IONIC_ENV === 'prod') {
    return [
      // This helps ensure the builds are consistent if source hasn't changed:
      new webpack.optimize.OccurrenceOrderPlugin(),

      // Try to dedupe duplicated modules, if any:
      // Add this back in when Angular fixes the issue: https://github.com/angular/angular-cli/issues/1587
      //new DedupePlugin()
    ];
  }

  // for dev builds, use our custom environment
  return [
    ionicWebpackFactory.getIonicEnvironmentPlugin()
  ];
}
*/

//OLD BASE VERSION FROM TUTORIAL
/*
function getPlugins() {
  if (process.env.IONIC_ENV === 'prod') {
    return [
      // This helps ensure the builds are consistent if source hasn't changed:
      new webpack.optimize.OccurrenceOrderPlugin(),
      // Try to dedupe duplicated modules, if any:
      // Add this back in when Angular fixes the issue: https://github.com/angular/angular-cli/issues/1587
      //new DedupePlugin()
    ];
  }
  return [];  //CHANGED_IN_TUTORIAL
}
*/

//OLD VERSION FROM TUTORIAL WHICH IS EDITED
function getPlugins() {

  //TUTORIAL 1/4 Added a Webpack plugin called ProvidePlugin which provides globals for our app
  var plugins = [
    // Try to dedupe duplicated modules, if any:
    // Add this back in when Angular fixes the issue: https://github.com/angular/angular-cli/issues/1587
    //new DedupePlugin()

    //TUTORIAL 2/4 We use typescript-extends package as our __extend
    //This will give us the ability to load external TypeScript modules with any issues.
    new webpack.ProvidePlugin({
      __extends: 'typescript-extends'
    })
  ];

  if (process.env.IONIC_ENV === 'prod') {
    // This helps ensure the builds are consistent if source hasn't changed:
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
  }
  return plugins;
}

//NOT PRESENT IN BASE VERSION TUTORIAL
function getSourcemapLoader() {
  if (process.env.IONIC_ENV === 'prod') {
    // TODO figure out the disk loader, it's not working yet
    return [];
  }

  return [
    {
      test: /\.ts$/,
      loader: path.join(process.env.IONIC_APP_SCRIPTS_DIR, 'dist', 'webpack', 'typescript-sourcemap-loader-memory.js')
    }
  ];
}

//NOT PRESENT IN BASE VERSION TUTORIAL
function getDevtool() {
  if (process.env.IONIC_ENV === 'prod') {
    // for now, just force source-map for prod builds
    return 'source-map';
  }

  return process.env.IONIC_SOURCE_MAP;
}

module.exports = {
  entry: getEntryPoint(),
  output: {
    path: '{{BUILD}}',
    filename: 'main.js',
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),  //NOT PRESENT IN BASE VERSION TUTORIAL
  },
  devtool: getDevtool(),  //NOT PRESENT IN BASE VERSION TUTORIAL

  resolve: {
    extensions: ['.js', '.json', '.ts'],
    //ADDED FROM TUTORIAL
    //TUTORIAL 3/4 We created an alias for api - which means that any import that starts with "api" will be resolved into the directory we specified (../api/ in our case)
    alias: {
      'api': path.resolve(__dirname, '../api')
    }
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      //ADDED FROM TUTORIAL
      //TUTORIAL 4/4
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        loaders: ['awesome-typescript-loader']  //NEED NPM INSTALL
      }
    ].concat(getSourcemapLoader())  //NOT PRESENT IN BASE VERSION TUTORIAL
  },

  plugins: getPlugins(),

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    __dirname: true  //ADDED FROM TUTORIAL
  }
};