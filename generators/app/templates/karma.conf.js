const merge      = require('webpack-merge');
const baseConfig = require('./webpack.config');

const webpackConfig = merge(baseConfig, {
  devtool: '#inline-source-map'
});

delete webpackConfig.entry;

webpackConfig.module.preLoaders = webpackConfig.module.preLoaders || [];

webpackConfig.module.preLoaders.unshift({
  test   : /\.js$/,
  loader : 'isparta',
  include: path.resolve('src/')
});

webpackConfig.module.loaders.some((loader, i) => {
  if (loader.loader === 'babel') {
    loader.include = path.resolve('test/');
    return true;
  }

  return false;
});

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: ['test/index.js'],
    exclude: [],
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap', 'coverage']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },
    colors: true,
    logLevel: config.LOG_DISABLE,
    browsers: ['PhantomJS'],
    coverageReporter: {
      watermarks: {
        statements: [60, 70],
        functions : [60, 70],
        branches  : [60, 70],
        lines     : [60, 70]
      },
      includeAllSources: true,
      dir      : './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  });
};
