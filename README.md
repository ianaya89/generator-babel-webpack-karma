# generator-babel-webpack-karma
[![Coverage Status](https://coveralls.io/repos/github/ianaya89/generator-bwk/badge.svg?branch=master)](https://coveralls.io/github/ianaya89/generator-bwk?branch=master)
[![bitHound Dependencies](https://www.bithound.io/github/ianaya89/generator-bwk/badges/dependencies.svg)](https://www.bithound.io/github/ianaya89/generator-bwk/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/ianaya89/generator-bwk/badges/devDependencies.svg)](https://www.bithound.io/github/ianaya89/generator-bwk/master/dependencies/npm)

> Yeoman generator to build npm client side libraries using babel, webpack & karma

![yeoman](img/yeoman.png)


## Installation

First, install [Yeoman](http://yeoman.io) and generator-bwk using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-babel-webpack-karma
```

Then generate your new project:

```bash
yo generator-babel-webpack-karma
```

## Scaffolding

```
└───src/
|   ├───index.js
└───test/
    ├───index.js
    ├───spec/
    │   └───index.spec.js
├───.babelrc
├───.editorconfig
├───.eslintignore
├───.eslintrc.json
├───.gitignore
├───.lgtm
├───.npmignore
├───.npmrc
├───circle.yml
├───karma.conf.js
├───LICENSE
├───MAINTAINERS
├───package.json
├───README.md
├───webpack.config.js
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Ignacio Anaya]()
