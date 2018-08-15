'use strict';

const fs = require('fs');
const Generator = require('yeoman-generator');
const upperCamelCase = require('uppercamelcase');
const decamelize = require('decamelize');

const defaultAppName = 'myApp';
const defaultTplPreffix = '/myApp/client';
const defaultParent = '';
const defaultLang = 'es6';

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        // This makes `componentName` a required argument.
        this.argument('name', { type: String, required: false });
        this.argument('type', { type: String, required: false });
        this.argument('lang', { type: String, required: false });
        this.argument('ngApp', { type: String, required: false });
    }

    paths() {
        this.destinationRoot();
    }

    start() {
        this.prompt([
            {
                type    : 'input',
                name    : 'name',
                message : 'Enter a name for the new component (i.e.: myNewComponent): '
            },
            {
                type    : 'list',
                choices : ['component', 'controller', 'service', 'module', 'directive', 'model'],
                name    : 'type',
                message : 'Select type of Angular component: '
            },
            {
                type    : 'list',
                choices : ['es6', 'es5'],
                name    : 'lang',
                message : 'Choose the JS version: ',
                store   : true
            },
            {
                type    : 'input',
                name    : 'ngApp',
                message : 'Enter the name for the Angular app (i.e.: myApp): ',
                store   : true
            },
            {
                type    : 'input',
                name    : 'parent',
                message : 'Enter the name for the parent module: '
            },
            {
                type    : 'input',
                name    : 'preffix',
                message : 'Customize the templateUrl for the components (i.e.: /myApp/client): ',
                store   : true
            },
        ]).then( (answers) => {
            // remove unwanted blank spaces
            answers.name = answers.name.trim();
            answers.ngApp = answers.ngApp.trim() || defaultAppName;
            answers.preffix = answers.preffix.trim() || defaultTplPreffix;
            answers.parent = answers.parent.trim() || defaultParent;
            answers.lang = answers.lang.toLowerCase().trim();

            // create destination folder
            this.destinationRoot(answers.name);

            // check lang spec support
            if (answers.lang !== 'es5' && answers.lang !== 'es6') {
                // es5 and es6 supported
                this.log(`ERROR: Unsupported JS Specification: ${answers.lang}`);
            }

            let controllerName = upperCamelCase(`${answers.name}Controller`);
            let serviceName = upperCamelCase(`${answers.name}Service`);
            let modelName = upperCamelCase(`${answers.name}Model`);
            let model = upperCamelCase(answers.name);
            let moduleName = (answers.parent !== '') ? 
                                `${answers.ngApp}.${answers.parent}.${answers.name}` : 
                                `${answers.ngApp}.${answers.name}`;
            let tplPreffix = answers.preffix;
            let tplModuleName = `${answers.ngApp}.templates`;
            let htmlElementName = decamelize(answers.name, '-');
            let className = decamelize(answers.name, '-');

            switch (answers.type) {
                case 'component':
                    this._writeModule(answers.name, answers.lang, moduleName);
                    this._writeComponent(answers.name, answers.lang, controllerName, moduleName, tplPreffix, tplModuleName, htmlElementName, className);
                    this._writeController(answers.name, answers.lang, controllerName, moduleName);
                    this._writeStyles(answers.name, className);
                    this._writeHtml(answers.name, className);
                    this._writeMD(answers.name);
                    break;
                case 'module':
                    this._writeModule(answers.name, answers.lang, moduleName);
                    this._writeMD(answers.name);
                    break;
                case 'controller':
                    this._writeModule(answers.name, answers.lang, moduleName);
                    this._writeController(answers.name, answers.lang, controllerName, moduleName);
                    this._writeMD(answers.name);
                    break;
                case 'directive':
                    this._writeModule(answers.name, answers.lang, moduleName);
                    this._writeDirective(answers.name, answers.lang, controllerName, moduleName, tplPreffix, tplModuleName, htmlElementName, className);
                    this._writeController(answers.name, answers.lang, controllerName, moduleName);
                    this._writeStyles(answers.name, className);
                    this._writeHtml(answers.name, className);
                    this._writeMD(answers.name);
                    break;
                case 'service':
                    this._writeModule(answers.name, answers.lang, moduleName);
                    this._writeService(answers.name, answers.lang, serviceName, moduleName);
                    this._writeMD(answers.name);
                    break;
                case 'model':
                    this._writeModule(answers.name, answers.lang, moduleName);
                    this._writeModel(answers.name, answers.lang, modelName, moduleName, model);
                    this._writeMD(answers.name);
                    break;
                default:
                    this.log('ERROR: Unsupported Angular component: ' + answers.type);
            }
            
        });
    }

    _writeStyles(name, className) {
        this.fs.copyTpl(
            this.templatePath('template.scss'),
            this.destinationPath(`${name}.scss`),
            { className: className, componentName: name }
        );
    }

    _writeHtml(name, className) {
        this.fs.copyTpl(
            this.templatePath('template.html'),
            this.destinationPath(`${name}.html`),
            { className: className }
        );
    }

    _writeMD(name) {
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'),
            { componentName: name }
        );
    }

    _writeModule(name, lang, module) {
        this.fs.copyTpl(
            this.templatePath(`module.${lang}.js`),
            this.destinationPath(`${name}.module.js`),
            { componentName: name, moduleName: module }
        );
    }

    _writeComponent(name, lang, controller, module, tplPreffix, tplModule, htmlElement, className) {
        // copy component
        this.fs.copyTpl(
            this.templatePath(`component.${lang}.js`),
            this.destinationPath(`${name}.component.js`),
            {
                componentName: name, 
                moduleName: module, 
                controllerName: controller, 
                templateUrlPreffix: tplPreffix 
            }
        );

        // copy specs for component
        this.fs.copyTpl(
            this.templatePath(`component.${lang}.spec.js`),
            this.destinationPath(`${name}.component.spec.js`),
            {
                componentName: name,
                moduleName: module,
                controllerName: controller,
                templateUrlPreffix: tplPreffix,
                tplModuleName: tplModule,
                htmlElementName: htmlElement,
                className: className,
            }
        );
    }

    _writeDirective(name, lang, controller, module, tplPreffix, tplModule, htmlElement, className) {
        // copy directive
        this.fs.copyTpl(
            this.templatePath(`directive.${lang}.js`),
            this.destinationPath(`${name}.directive.js`),
            {
                componentName: name, 
                moduleName: module, 
                controllerName: controller, 
                templateUrlPreffix: tplPreffix 
            }
        );

        // copy specs for directive
        this.fs.copyTpl(
            this.templatePath(`directive.${lang}.spec.js`),
            this.destinationPath(`${name}.directive.spec.js`),
            {
                componentName: name,
                moduleName: module,
                controllerName: controller,
                templateUrlPreffix: tplPreffix,
                tplModuleName: tplModule,
                htmlElementName: htmlElement,
                className: className,
            }
        );
    }

    _writeController(name, lang, controller, module) {
        // copy controller
        this.fs.copyTpl(
            this.templatePath(`controller.${lang}.js`),
            this.destinationPath(`${name}.controller.js`),
            { componentName: name, moduleName: module, controllerName: controller }
        );

        // copy specs for controller
        this.fs.copyTpl(
            this.templatePath(`controller.${lang}.spec.js`),
            this.destinationPath(`${name}.controller.spec.js`),
            { componentName: name, moduleName: module, controllerName: controller }
        );
    }

    _writeService(name, lang, service, module) {
        // copy service
        this.fs.copyTpl(
            this.templatePath(`service.${lang}.js`),
            this.destinationPath(`${name}.service.js`),
            { componentName: name, moduleName: module, serviceName: service }
        );

        // copy specs for service
        this.fs.copyTpl(
            this.templatePath(`service.${lang}.spec.js`),
            this.destinationPath(`${name}.service.spec.js`),
            { componentName: name, moduleName: module, serviceName: service }
        );
    }

    _writeModel(name, lang, modelName, module, model) {
        // copy model
        this.fs.copyTpl(
            this.templatePath(`model.${lang}.js`),
            this.destinationPath(`${name}.model.js`),
            { componentName: name, moduleName: module, modelName: modelName, model: model }
        );

        // copy specs for model
        this.fs.copyTpl(
            this.templatePath(`model.${lang}.spec.js`),
            this.destinationPath(`${name}.model.spec.js`),
            { componentName: name, moduleName: module, modelName: modelName, model: model }
        );
    }

    _verify() {
        this.log('Verifying...');
        if (fs.existsSync(componentName)) {
            this.error('ERROR: The destination folder for the component already exists.');
        }
    }

};
