/**
 * <%= controllerName %> Controller Test
 * @namespace Tests
 */
describe('<%= controllerName %>', function() {
    'use strict';

    // variables
    var $ctrl;
    var $scope, $rootScope, $componentController;
    var ExampleService1, ExampleService2;

    // mocks
    var ExampleService1Mock = {};
    var ExampleService2Mock = {};
    var mockedAttr = 'something';

    // helper functions
    function getController(myBindings) {
        var controller = $componentController('<%= componentName %>', {'$scope': $scope}, myBindings);
        return controller;
    }

    // load required modules
    beforeEach(module('<%= moduleName %>')); // our module

    // provide mocks and global constants
    beforeEach(module(function ($provide) {
        $provide.value('ExampleService1', ExampleService1Mock);
        $provide.value('ExampleService2', ExampleService2Mock);
    }));

    // inject the providers for the controller dependencies
    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');

        ExampleService1 =  $injector.get('ExampleService1');
        ExampleService2 =  $injector.get('ExampleService2');
        $componentController = $injector.get('$componentController');

        $scope = $rootScope.$new();
    }));

    // get the controller
    beforeEach(function () {
        var bindings = {
            myAttr: mockedAttr
        };

        $ctrl = getController(bindings);
    });

    // test the controller
    it('should exists', function() {
        expect($ctrl).toBeDefined();
        expect($ctrl).not.toBe(null);
    });

    it('should have all bindings set', function () {
        expect($ctrl.myAttr).toEqual(mockedAttr);
    });

    it('has all variables defined and set', function() {
        expect($ctrl.myVar).toEqual('some value');
    });

    it('should have all methods defined', function () {
        expect($ctrl.$onInit).toBeDefined();
        expect(typeof $ctrl.$onInit).toEqual('function');
        expect($ctrl.$onChanges).toBeDefined();
        expect(typeof $ctrl.$onChanges).toEqual('function');
    });

});
