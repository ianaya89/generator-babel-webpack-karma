const fs     = require('fs');
const chalk  = require('chalk');
const yosay  = require('yosay');
const yeoman = require('yeoman-generator');

const libraryGenerator = yeoman.Base.extend({
  prompting: {
    welcome: function() {
      this.log(yosay('\'Allo \'allo! Out of the box I include Babel, Webpack & Karma, as well as a few other goodies, to build your bwk npm lib.'));
    },
    ask: function() {
      const done = this.async();
      this.prompt([{
        name    : 'name',
        type    : 'input',
        message : 'What is the name of the library?',
        default : path.basename(this.destinationPath())
      }, {
        name    : 'libraryDescription',
        type    : 'input',
        message : 'How would you describe the library?'
      }, {
        name    : 'libraryVersion',
        type    : 'input',
        message : 'What version is this library?',
        default : '0.1.0'
      }, {
        name    : 'libraryRevision',
        type    : 'input',
        message : 'What revision name do you want to use?',
        default : 'inDev'
      }, {
        name    : 'authorName',
        type    : 'input',
        message : 'Who is the author?',
        store   : true
      }, {
        name    : 'authorEmail',
        type    : 'input',
        message : 'And their email?',
        store   : true
      }, {
        name    : 'authorUrl',
        type    : 'input',
        message : 'What about the url to their website?',
        store   : true
      }, {
        name    : 'databaseName',
        type    : 'input',
        message : 'what should the database be named?',
        default : (answers) => toCase(answers.name, 'kebab-case')
      }, {
        name   : 'generationType',
        type   : 'checkbox',
        message: 'What should I use to generate your REM library?',
        choices: [
          {
            name   : 'Resources',
            value  : 'resources',
            checked: true
          }, {
            name : 'Routers',
            value: 'routers'
          }, {
            name : 'Schemas',
            value: 'schemas'
          }
        ],
        validate: (answer) => answer.length > 0
      }, {
        when    : (answers) => answers.generationType.indexOf('resources') > -1,
        name    : 'resources',
        type    : 'input',
        message : 'What resources do you want me to add?',
        filter  : (answer) => answer.split(' '),
        validate: (answer) => (/^[\w\d-]+(?: [\w\d-]+)*$/).test(answer)
      }, {
        when    : (answers) => answers.generationType.indexOf('routers') > -1,
        name    : 'routers',
        type    : 'input',
        message : 'What routers do you want me to add?',
        filter  : (answer) => answer.split(' '),
        validate: (answer) => (/^[\w\d-]+(?: [\w\d-]+)*$/).test(answer)
      }, {
        when    : (answers) => answers.generationType.indexOf('schemas') > -1,
        name    : 'schemas',
        type    : 'input',
        message : 'What schemas do you want me to add?',
        filter  : (answer) => answer.split(' '),
        validate: (answer) => (/^[\w\d-]+(?: [\w\d-]+)*$/).test(answer)
      }], (answers) => {

        this.libraryName         = toCase(answers.name, 'kebab-case');
        this.libraryClassName    = toCase(answers.name, 'ClassCase');
        this.libraryInstanceName = toCase(answers.name, 'camelCase');
        this.libraryDescription  = answers.libraryDescription;
        this.libraryVersion      = answers.libraryVersion;
        this.libraryRevision     = answers.libraryRevision;
        this.authorName         = answers.authorName;
        this.authorEmail        = answers.authorEmail;
        this.authorUrl          = answers.authorUrl;
        this.databaseName       = answers.databaseName;
        this.routers            = answers.routers || [];
        this.schemas            = answers.schemas || [];
        this.resources          = answers.resources || [];

        if (this.resources) {
          this.resources.forEach((resourceName) => {
            this.routers.push(resourceName);
            this.schemas.push(resourceName);
          });
          this.resources = this.resources.map(genResourceNames);
        }

        this.routers = this.routers.map(genResourceNames);
        this.schemas = this.schemas.map(genResourceNames);

        this.libraryConfigName = this.libraryInstanceName.toLowerCase();
        this.schemaRequireSrc = genSchemaRequireSrc(this.schemas);
        this.schemaSetupSrc   = genSchemaSetupSrc(this.schemas);
        this.routerRequireSrc = genRouterRequireSrc(this.routers);
        this.routerSetupSrc   = genRouterSetupSrc(this.routers);

        done(null);
      });
    }
  },

  writing: {
    gitignore() {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    index() {
      this.fs.copyTpl(
        this.templatePath('index.js'),
        this.destinationPath('index.js'),
        {
          libraryClassName: this.libraryClassName,
          libraryName     : this.libraryName
        }
      );
    },

    eslintrc() {
      this.fs.copy(
        this.templatePath('eslintrc.json'),
        this.destinationPath('.eslintrc.json')
      );
    },

    eslintignore() {
      this.fs.copy(
        this.templatePath('eslintignore'),
        this.destinationPath('.eslintignore')
      );
    },

    packageJSON() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          libraryName       : this.libraryName,
          libraryDescription: this.libraryDescription,
          libraryVersion    : this.libraryVersion,
          libraryRevision   : this.libraryRevision,
          authorName        : this.authorName,
          authorEmail       : this.authorEmail,
          authorUrl         : this.authorUrl
        }
      );
    },

    src() {
      this.fs.copyTpl(
        this.templatePath('src/index.js'),
        this.destinationPath('src/' + this.libraryName),
        {
          splashName        : toCase(this.libraryInstanceName, 'ClassCase'),
          libraryInstanceName: this.libraryInstanceName
        }
      );
    }
  },

  install: function() {
    fs.chmodSync(this.destinationPath('bin/' + this.libraryName), 0755);
    this.npmInstall();
  }
});


module.exports = libraryGenerator;
