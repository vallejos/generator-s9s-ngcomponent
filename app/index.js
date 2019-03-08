'use strict';
const camelCase = require('camelcase');
const decamelize = require('decamelize');
const {existsSync} = require('fs');
const Generator = require('yeoman-generator');
const {resolve} = require('path');
const upperCamelCase = require('uppercamelcase');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        // This makes `componentName` a required argument.
        this.argument('name', { type: String, required: false });
        this.argument('ccApp', { type: String, required: false });
        this.argument('type', { type: String, required: false });
    }

    async start() {
        const TYPE_COMPONENT = 'Component';
        const TYPE_CONTROLLER = 'Controller';
        const TYPE_DIRECTIVE = 'Directive';
        const TYPE_MODEL = 'Model';
        const TYPE_MODULE = 'Module';
        const TYPE_SERVICE = 'Service';

        const types = {
            TYPE_COMPONENT,
            TYPE_CONTROLLER,
            TYPE_DIRECTIVE,
            TYPE_MODEL,
            TYPE_MODULE,
            TYPE_SERVICE
        };

        const defaultAppName = 'ccApp';
        const defaultPrefix = 'my';

        const answers = await this.prompt([
            {
                type    : 'list',
                choices : Object.values(types),
                name    : 'type',
                message : 'Type:'
            },
            {
                type    : 'input',
                name    : 'name',
                message : 'Name:',
                default : 'ExampleSomething',
                filter  : value => upperCamelCase(value.trim())
            },
            {
                type    : 'input',
                name    : 'prefix',
                message : ({type}) => `${type} prefix:`,
                default : defaultPrefix,
                filter  : value => value.trim().toLowerCase() || defaultPrefix,
                when    : ({type}) => type === TYPE_COMPONENT || type === TYPE_DIRECTIVE
            },
            {
                type    : 'confirm',
                name    : 'dependencies',
                message : 'Use dependencies recommended by S9S:'
            },
            {
                type    : 'input',
                name    : 'ccApp',
                message : 'AngularJS app name:',
                default : defaultAppName,
                filter  : value => value.trim() || defaultAppName
            },
            {
                type    : 'input',
                name    : 'parent',
                message : 'Parent module name:',
                filter  : value => value.trim()
            }
        ]);

        const {dependencies, name, ccApp, parent, prefix, type} = answers;

        if (!name) {
            this.log('ERROR: name must not be empty');
            return;
        }

        const camelName = camelCase(name);
        const kebabName = decamelize(`${prefix}${name}`, '-');

        const config = {
            ...types,
            camelName,
            kebabName,
            moduleName: parent ? `${ccApp}.${parent}.${camelName}` : `${ccApp}.${camelName}`,
            prefix,
            titleName: name,
            type,
            useS9SDependencies: dependencies
        };

        // @todo https://github.com/yeoman/yo/issues/603
        const cwd = process.env.INIT_CWD || this.contextRoot;
        const outputDir = resolve(cwd, camelName);

        // create destination folder
        this.destinationRoot(outputDir);

        switch (type) {
            case TYPE_COMPONENT:
                this._writeModule(config);
                this._writeComponent(config);
                this._writeController(config);
                this._writeStyles(config);
                this._writeHtml(config);
                this._writeMD(config);
                break;
            case TYPE_CONTROLLER:
                this._writeModule(config);
                this._writeController(config);
                this._writeMD(config);
                break;
            case TYPE_DIRECTIVE:
                this._writeModule(config);
                this._writeDirective(config);
                this._writeController(config);
                this._writeStyles(config);
                this._writeHtml(config);
                this._writeMD(config);
                break;
            case TYPE_MODEL:
                this._writeModule(config);
                this._writeModel(config);
                this._writeMD(config);
                break;
            case TYPE_MODULE:
                this._writeModule(config);
                this._writeMD(config);
                break;
            case TYPE_SERVICE:
                this._writeModule(config);
                this._writeService(config);
                this._writeMD(config);
                break;
            default:
                this.log(`ERROR: Unsupported type: ${type}`);
        }
    }

    _writeStyles(config) {
        this.fs.copyTpl(
            this.templatePath('template.scss'),
            this.destinationPath(`${config.camelName}.scss`),
            config
        );
    }

    _writeHtml(config) {
        this.fs.copyTpl(
            this.templatePath('template.html'),
            this.destinationPath(`${config.camelName}.html`),
            config
        );
    }

    _writeMD(config) {
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'),
            config
        );
    }

    _writeModule(config) {
        this.fs.copyTpl(
            this.templatePath(`module.js`),
            this.destinationPath(`${config.camelName}.module.js`),
            config
        );
    }

    _writeComponent(config) {
        // copy component
        this.fs.copyTpl(
            this.templatePath(`component.js`),
            this.destinationPath(`${config.camelName}.component.js`),
            config
        );

        // copy specs for component
        this.fs.copyTpl(
            this.templatePath(`component.spec.js`),
            this.destinationPath(`${config.camelName}.component.spec.js`),
            config
        );
    }

    _writeDirective(config) {
        // copy directive
        this.fs.copyTpl(
            this.templatePath(`directive.js`),
            this.destinationPath(`${config.camelName}.directive.js`),
            config
        );

        // copy specs for directive
        this.fs.copyTpl(
            this.templatePath(`directive.spec.js`),
            this.destinationPath(`${config.camelName}.directive.spec.js`),
            config
        );
    }

    _writeController(config) {
        // copy controller
        this.fs.copyTpl(
            this.templatePath(`controller.js`),
            this.destinationPath(`${config.camelName}.controller.js`),
            config
        );

        // copy specs for controller
        this.fs.copyTpl(
            this.templatePath(`controller.spec.js`),
            this.destinationPath(`${config.camelName}.controller.spec.js`),
            config
        );
    }

    _writeService(config) {
        // copy service
        this.fs.copyTpl(
            this.templatePath(`service.js`),
            this.destinationPath(`${config.camelName}.service.js`),
            config
        );

        // copy specs for service
        this.fs.copyTpl(
            this.templatePath(`service.spec.js`),
            this.destinationPath(`${config.camelName}.service.spec.js`),
            config
        );
    }

    _writeModel(config) {
        // copy model
        this.fs.copyTpl(
            this.templatePath(`model.js`),
            this.destinationPath(`${config.camelName}.model.js`),
            config
        );

        // copy specs for model
        this.fs.copyTpl(
            this.templatePath(`model.spec.js`),
            this.destinationPath(`${config.camelName}.model.spec.js`),
            config
        );
    }

    _verify() {
        this.log('Verifying...');
        if (existsSync(name)) {
            this.error('ERROR: The destination folder for the component already exists.');
        }
    }

};
