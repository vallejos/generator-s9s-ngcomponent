'use strict';
const decamelize = require('decamelize');
const {existsSync} = require('fs');
const Generator = require('yeoman-generator');
const upperCamelCase = require('uppercamelcase');

const defaultAppName = 'myApp';
const defaultLang = 'es6';
const defaultTplPrefix = '/myApp/client';

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        // This makes `componentName` a required argument.
        this.argument('name', { type: String, required: false });
        this.argument('lang', { type: String, required: false });
        this.argument('ngApp', { type: String, required: false });
        this.argument('type', { type: String, required: false });
    }

    async start() {
        const TYPE_COMPONENT = 'component';
        const TYPE_CONTROLLER = 'controller';
        const TYPE_DIRECTIVE = 'directive';
        const TYPE_MODEL = 'model';
        const TYPE_MODULE = 'module';
        const TYPE_SERVICE = 'service';

        const answers = await this.prompt([
            {
                type    : 'input',
                name    : 'name',
                message : 'Component name:',
                default : 'myComponent'
            },
            {
                type    : 'list',
                choices : [TYPE_COMPONENT, TYPE_CONTROLLER, TYPE_DIRECTIVE, TYPE_MODEL, TYPE_MODULE, TYPE_SERVICE],
                name    : 'type',
                message : 'Component type:'
            },
            {
                type    : 'list',
                choices : ['es6', 'es5'],
                name    : 'lang',
                message : 'JavaScript version:',
                store   : true
            },
            {
                type    : 'input',
                name    : 'ngApp',
                message : 'AngularJS app name:',
                default : defaultAppName,
                store   : true
            },
            {
                type    : 'input',
                name    : 'parent',
                message : 'Parent module name:'
            },
            {
                type    : 'input',
                name    : 'prefix',
                message : 'Component templateUrl (i.e.: /myApp/client):',
                store   : true
            }
        ]);

        // remove unwanted blank spaces
        answers.lang = answers.lang.toLowerCase().trim();
        answers.name = answers.name.trim();
        answers.ngApp = answers.ngApp.trim() || defaultAppName;
        answers.parent = answers.parent.trim();
        answers.prefix = answers.prefix.trim() || defaultTplPrefix;

        // create destination folder
        this.destinationRoot(answers.name);

        // check lang spec support
        if (answers.lang !== 'es5' && answers.lang !== 'es6') {
            // es5 and es6 supported
            this.log(`ERROR: Unsupported JS Specification: ${answers.lang}`);
        }

        const controllerName = upperCamelCase(`${answers.name}Controller`);
        const serviceName = upperCamelCase(`${answers.name}Service`);
        const modelName = upperCamelCase(`${answers.name}Model`);
        const model = upperCamelCase(answers.name);
        const moduleName = (answers.parent !== '') ?
                            `${answers.ngApp}.${answers.parent}.${answers.name}` :
                            `${answers.ngApp}.${answers.name}`;
        const templateUrlPrefix = answers.prefix;
        const templateModuleName = `${answers.ngApp}.templates`;
        const htmlElementName = decamelize(answers.name, '-');
        const className = decamelize(answers.name, '-');

        switch (answers.type) {
            case TYPE_COMPONENT:
                this._writeModule(answers.name, answers.lang, moduleName);
                this._writeComponent(answers.name, answers.lang, controllerName, moduleName, templateUrlPrefix, templateModuleName, htmlElementName, className);
                this._writeController(answers.name, answers.lang, controllerName, moduleName);
                this._writeStyles(answers.name, className);
                this._writeHtml(answers.name, className);
                this._writeMD(answers.name);
                break;
            case TYPE_MODULE:
                this._writeModule(answers.name, answers.lang, moduleName);
                this._writeMD(answers.name);
                break;
            case TYPE_CONTROLLER:
                this._writeModule(answers.name, answers.lang, moduleName);
                this._writeController(answers.name, answers.lang, controllerName, moduleName);
                this._writeMD(answers.name);
                break;
            case TYPE_DIRECTIVE:
                this._writeModule(answers.name, answers.lang, moduleName);
                this._writeDirective(answers.name, answers.lang, controllerName, moduleName, templateUrlPrefix, templateModuleName, htmlElementName, className);
                this._writeController(answers.name, answers.lang, controllerName, moduleName);
                this._writeStyles(answers.name, className);
                this._writeHtml(answers.name, className);
                this._writeMD(answers.name);
                break;
            case TYPE_SERVICE:
                this._writeModule(answers.name, answers.lang, moduleName);
                this._writeService(answers.name, answers.lang, serviceName, moduleName);
                this._writeMD(answers.name);
                break;
            case TYPE_MODEL:
                this._writeModule(answers.name, answers.lang, moduleName);
                this._writeModel(answers.name, answers.lang, modelName, moduleName, model);
                this._writeMD(answers.name);
                break;
            default:
                this.log(`ERROR: Unsupported Angular component: ${answers.type}`);
        }
    }

    _writeStyles(componentName, className) {
        this.fs.copyTpl(
            this.templatePath('template.scss'),
            this.destinationPath(`${componentName}.scss`),
            { className, componentName }
        );
    }

    _writeHtml(componentName, className) {
        this.fs.copyTpl(
            this.templatePath('template.html'),
            this.destinationPath(`${componentName}.html`),
            { className }
        );
    }

    _writeMD(componentName) {
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'),
            { componentName }
        );
    }

    _writeModule(componentName, lang, moduleName) {
        this.fs.copyTpl(
            this.templatePath(`module.${lang}.js`),
            this.destinationPath(`${componentName}.module.js`),
            { componentName, moduleName }
        );
    }

    _writeComponent(componentName, lang, controllerName, moduleName, templateUrlPrefix, templateModuleName, htmlElementName, className) {
        // copy component
        this.fs.copyTpl(
            this.templatePath(`component.${lang}.js`),
            this.destinationPath(`${componentName}.component.js`),
            {
                componentName,
                controllerName,
                moduleName,
                templateUrlPrefix
            }
        );

        // copy specs for component
        this.fs.copyTpl(
            this.templatePath(`component.${lang}.spec.js`),
            this.destinationPath(`${componentName}.component.spec.js`),
            {
                className,
                componentName,
                controllerName,
                htmlElementName,
                moduleName,
                templateModuleName,
                templateUrlPrefix
            }
        );
    }

    _writeDirective(componentName, lang, controllerName, moduleName, templateUrlPrefix, templateModuleName, htmlElementName, className) {
        // copy directive
        this.fs.copyTpl(
            this.templatePath(`directive.${lang}.js`),
            this.destinationPath(`${componentName}.directive.js`),
            {
                componentName,
                controllerName,
                moduleName,
                templateUrlPrefix
            }
        );

        // copy specs for directive
        this.fs.copyTpl(
            this.templatePath(`directive.${lang}.spec.js`),
            this.destinationPath(`${componentName}.directive.spec.js`),
            {
                className,
                componentName,
                controllerName,
                htmlElementName,
                moduleName,
                templateModuleName,
                templateUrlPrefix
            }
        );
    }

    _writeController(componentName, lang, controllerName, moduleName) {
        // copy controller
        this.fs.copyTpl(
            this.templatePath(`controller.${lang}.js`),
            this.destinationPath(`${componentName}.controller.js`),
            { componentName, controllerName, moduleName }
        );

        // copy specs for controller
        this.fs.copyTpl(
            this.templatePath(`controller.${lang}.spec.js`),
            this.destinationPath(`${componentName}.controller.spec.js`),
            { componentName, controllerName, moduleName }
        );
    }

    _writeService(componentName, lang, serviceName, moduleName) {
        // copy service
        this.fs.copyTpl(
            this.templatePath(`service.${lang}.js`),
            this.destinationPath(`${componentName}.service.js`),
            { componentName, moduleName, serviceName }
        );

        // copy specs for service
        this.fs.copyTpl(
            this.templatePath(`service.${lang}.spec.js`),
            this.destinationPath(`${componentName}.service.spec.js`),
            { componentName, moduleName, serviceName }
        );
    }

    _writeModel(componentName, lang, modelName, moduleName, model) {
        // copy model
        this.fs.copyTpl(
            this.templatePath(`model.${lang}.js`),
            this.destinationPath(`${componentName}.model.js`),
            { componentName, model, modelName, moduleName }
        );

        // copy specs for model
        this.fs.copyTpl(
            this.templatePath(`model.${lang}.spec.js`),
            this.destinationPath(`${componentName}.model.spec.js`),
            { componentName, model, modelName, moduleName }
        );
    }

    _verify() {
        this.log('Verifying...');
        if (existsSync(componentName)) {
            this.error('ERROR: The destination folder for the component already exists.');
        }
    }

};
