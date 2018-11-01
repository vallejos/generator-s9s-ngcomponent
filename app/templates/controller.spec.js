/**
 * <%= controllerName %> Controller Test
 * @namespace Tests
 */
describe('<%= controllerName %>', () => {
    'use strict';

    // variables

    let $componentController, $ctrl, $rootScope, $scope, ExampleService1, ExampleService2;


    // mocks
    const ExampleService1Mock = {};
    const ExampleService2Mock = {};
    const mockedAttr = 'something';

    // helper functions
    const getController = myBindings => {
        $componentController('<%= componentName %>', { $scope }, myBindings);
    };

    // load required modules
    beforeEach(module('<%= moduleName %>')); // our module

    // provide mocks and global constants
    beforeEach(module($provide => {
        $provide.value('ExampleService1', ExampleService1Mock);
        $provide.value('ExampleService2', ExampleService2Mock);
    }));

    // inject the providers for the controller dependencies
    beforeEach(inject($injector => {
        $rootScope = $injector.get('$rootScope');

        ExampleService1 = $injector.get('ExampleService1');
        ExampleService2 = $injector.get('ExampleService2');
        $componentController = $injector.get('$componentController');

        $scope = $rootScope.$new();
    }));

    // get the controller
    beforeEach(() => {
        const bindings = {
            myAttr: mockedAttr
        };

        $ctrl = getController(bindings);
    });

    // test the controller
    it('should exists', () => {
        expect($ctrl).toBeDefined();
        expect($ctrl).not.toBe(null);
    });

    it('should have all bindings set', () => {
        expect($ctrl.myAttr).toEqual(mockedAttr);
    });

    it('has all variables defined and set', () => {
        expect($ctrl.myVar).toEqual('some value');
    });

    it('should have all methods defined', () => {
        expect($ctrl.$onInit).toBeDefined();
        expect(typeof $ctrl.$onInit).toEqual('function');
        expect($ctrl.$onChanges).toBeDefined();
        expect(typeof $ctrl.$onChanges).toEqual('function');
    });

});
