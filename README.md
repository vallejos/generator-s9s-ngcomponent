# generator-s9s-ngcomponent
> An ES2015+ code generator for AngularJS 1.x

Generate a module with a component, controller, directive, model or service.

Features include:
* AngularJS 1.5 components
* ES2015 modules
* JSDoc comments

ES2015 classes are not currently used, but likely will at some point in the future.

**If you need ES5 support**, use version `1.0.0`.

## Installation
This generator requires that [yeoman](https://npmjs.com/yo) be installed (locally or globally, depending on your use case). With that, this generator should be installed to the same scope.
```shell
npm install generator-s9s-ngcomponent
```
…or
```shell
npm install -g generator-s9s-ngcomponent
```

## Usage
```shell
yo s9s-ngcomponent
```

## Generated Code

### Dependencies
Mandatory dependencies:
* [Immutable.js](https://npmjs.com/immutable)
* [Jasmine](https://npmjs.com/jasmine-core) or compatible

Optional (S9S) dependencies:
* [jasmine-jquery](https://npmjs.com/jasmine-jquery)
* Internal S9S helpers (not currently open source)

### Necessary Configuration
Tooling configuration is not included. You will need to configure:
* Your module loader or bundler to support the importing of HTML and SCSS files.
* Your test runner.

### Result
For directory and file names, "camelCase" was chosen over "PascalCase" and "kebab-case" for easy typing and autocomplete within a terminal.

The code generated follows a combination of the following style guides:
* https://github.com/johnpapa/angular-styleguide/tree/master/a1 (ES5)
* https://github.com/rwwagner90/angular-styleguide-es6
* https://github.com/toddmotto/angularjs-styleguide

#### Models
The model is a [`service`](https://docs.angularjs.org/guide/services) that uses Immutable.js, which is injected by default into the model. By default, it will be an `Immutable.Record`. You need to change this based on your needs.

```
└── exampleSomething/
    ├── exampleSomething.module.js
    ├── exampleSomething.model.js
    ├── exampleSomething.model.spec.js
    └── README.md
```

#### Controllers
A generator for a [`controller`](https://docs.angularjs.org/guide/controller).

```
└── exampleSomething/
    ├── exampleSomething.module.js
    ├── exampleSomething.controller.js
    ├── exampleSomething.controller.spec.js
    └── README.md
```

#### Components
A generator for a [`component`](https://docs.angularjs.org/guide/component). Per the style guides, the `$scope` name is `vm` instead of the default `$ctrl`.

```
└── exampleSomething/
    ├── exampleSomething.module.js
    ├── exampleSomething.component.js
    ├── exampleSomething.component.spec.js
    ├── exampleSomething.controller.js
    ├── exampleSomething.controller.spec.js
    ├── exampleSomething.html
    ├── exampleSomething.scss
    └── README.md
```

#### Services
A generator for [`service`](https://docs.angularjs.org/guide/services).

```
└── exampleSomething/
    ├── exampleSomething.module.js
    ├── exampleSomething.service.js
    ├── exampleSomething.service.spec.js
    └── README.md
```

#### Directives
Since AngularJS 1.5, it's better to use `component`, but generating [`directives`](https://docs.angularjs.org/guide/directive) is still supported for heavy DOM-related code.

```
└── exampleSomething/
    ├── exampleSomething.module.js
    ├── exampleSomething.directive.js
    ├── exampleSomething.directive.spec.js
    ├── exampleSomething.controller.js
    ├── exampleSomething.controller.spec.js
    ├── exampleSomething.html
    ├── exampleSomething.scss
    └── README.md
```

#### Modules
A generator for an empty [`module`](https://docs.angularjs.org/guide/module).

```
└── exampleSomething/
    ├── exampleSomething.module.js
    └── README.md
```
