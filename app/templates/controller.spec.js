import <%= titleName %>Module from './<%= camelName %>.module.js';

/**
 * <%= camelName %> controller tests
 * @namespace Tests
 */
describe('<%= camelName %> controller', () => {
    // variables
    let <% if (type === TYPE_COMPONENT) { %>$componentController, <% } else { %>$controller, <% } %>$ctrl, $scope, ExampleService1, ExampleService2;

    // mocks
    const attrMock = 'something';
    const ExampleService1Mock = {};
    const ExampleService2Mock = {};

    // helper functions
    <%_ if (type === TYPE_COMPONENT) { -%>
    const getController = bindings => $componentController('<%= prefix %><%= titleName %>', {$scope}, bindings);
    <%_ } else { -%>
    const getController = bindings => $controller('<%= titleName %>Controller', {$scope}, bindings);
    <%_ } -%>

    // load required modules
    beforeEach(angular.mock.module(<%= titleName %>Module));

    // provide mocks and global constants
    beforeEach(angular.mock.module($provide => {
        $provide.value('ExampleService1', ExampleService1Mock);
        $provide.value('ExampleService2', ExampleService2Mock);
    }));

    // inject the providers for the controller dependencies
    beforeEach(angular.mock.inject($injector => {
        $componentController = $injector.get('$componentController');
        $scope = $injector.get('$rootScope').$new();
        ExampleService1 = $injector.get('ExampleService1');
        ExampleService2 = $injector.get('ExampleService2');
    }));

    // get the controller
    beforeEach(() => {
        $ctrl = getController({
            myAttr: attrMock
        });
    });

    // test the controller
    it('exists', () => {
        expect($ctrl).toBeDefined();
        expect($ctrl).not.toBe(null);
    });

    it('has all bindings assigned', () => {
        expect($ctrl.myAttr).toEqual(attrMock);
    });

    it('has all variables defined and assigned', () => {
        expect($ctrl.myVar).toEqual('some value');
    });

    it('has all methods defined', () => {
        expect($ctrl.$onChanges).toBeDefined();
        expect($ctrl.$onChanges).toEqual(jasmine.any(Function));

        expect($ctrl.$onDestroy).toBeDefined();
        expect($ctrl.$onDestroy).toEqual(jasmine.any(Function));

        expect($ctrl.$onInit).toBeDefined();
        expect($ctrl.$onInit).toEqual(jasmine.any(Function));
    });

});
