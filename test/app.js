/* global describe before it */

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-babel-webpack-karma:app', () => {
  before(() =>
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({ someAnswer: true }).toPromise()
  );

  it('creates files', () => {
    assert.file([
      'src/index.js',
      'test/index.js',
      'test/.eslintrc',
      'test/specs/index.spec.js',
      '.babelrc',
      '.editorconfig',
      '.eslintignore',
      '.eslintrc',
      '.gitignore',
      '.npmignore',
      '.npmrc',
      'circle.yml',
      'karma.conf.js',
      'LICENSE',
      'package.json',
      'README.md',
      'webpack.config.js'
    ]);
  });
});
