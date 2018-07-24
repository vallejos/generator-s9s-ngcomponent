
# A basic component builder for Angular JS 1.x
This yeoman generator will build different Angular components, creating a skeleton for the different files, and adding some basic JSDoc documentation blocks.
Since version 0.0.6 from July 2018, I have added support for ES6 and the default since this version is ES6. ES5 can still be chosen using the `lang` parameter.

# Requirements
This is a Yeoman generator. You need to install Yeoman, NodeJS and npm to install the generator and its dependencies. Make sure you have all installed globally.

First, download and install NodeJS and npm. More information about NodeJS / npm: https://nodejs.org/

Second, install Yeoman. More information about Yeoman: http://yeoman.io/

# Installation
```
$ npm install -g generator-s9s-ngcomponent
```

# Usage
```
$ yo s9s-ngcomponent
```

# What does this generator do?
This yeoman generator will build different Angular components, creating a skeleton for the different files, and adding some basic JSDoc documentation blocks.

All the different Angular components will be defined by a module. The coding style used is the recommended for Angular 1 by John Papa (see: https://github.com/johnpapa/angular-styleguide/tree/master/a1), with the addition of Models and Angular 1.5 Components.

In the different generated files you will find one or more example parameters, properties, injected services, etc. Please replace them according to your needs. You will also need to update the tests.

All unit tests use Jasmine. The configuration to run these tests is not included in the generator.

#### Models
The Model for ES5 is an Angular Service that uses Immutable.js, which is injected by default in the Model service. Immutable.js is not included in the generator, you need to add it to your app to use the models. The model is just an Angular Service. By default, it will be an Immutable.Record. You need to change this based on your needs to other types.

Includes:
- module
- model
- model spec
- readme file

#### Controllers
A generator for a Controller.

Includes:
- module
- controller
- controller spec
- readme file

#### Components
A generator for the new Angular 1.5 Component. It uses templateUrl and the $scope name is `vm` instead of the default `$ctrl` that Angular uses. Make sure you change the templatePreffix as required since the path may be different from project to project. The default value is the current path.

Includes:
- module
- component
- component spec
- controller
- controller spec
- readme file
- html template
- sass styles

#### Services
A generator for an Angular Factory.

Includes:
- module
- readme file
- service
- service spec

#### Directives
Since Angular 1.5 it's better to use Components, but the generator supports Directives. Directives use templateUrl, a controller, and controllerAs syntax. Make sure you change the templatePreffix as required since the path may be different from project to project. The default value is the current path.

Includes:
- module
- directive
- directive spec
- controller
- controller spec
- readme file
- html template
- sass styles

#### Modules
It's possible to add a Module definition.

Includes:
- module
- readme file

# Credits
Fabian Vallejos <vallejosfab@gmail.com>

Twitter: https://twitter.com/vallejosfab

Blog: http://www.fabianvallejos.com/

# Licence
MIT
