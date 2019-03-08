import <%= titleName %>Module from './<%= camelName %>.module.js';

/**
 * <%= titleName %> service tests
 * @namespace Tests
 */
describe('<%= titleName %> service', () => {
    // variables
    let $q, <%= titleName %>, ExampleService1, ExampleService2;

    // mocks
    const ExampleService1Mock = {};
    const ExampleService2Mock = {};

    // helper functions
    function someHelper() {
        return;
    }

    // load required modules
    beforeEach(angular.mock.module(<%= titleName %>Module));

    // provide mocks and global constants
    beforeEach(angular.mock.module($provide => {
        $provide.value('ExampleService1', ExampleService1Mock);
        $provide.value('ExampleService2', ExampleService2Mock);
    }));

    // inject the providers for the service dependencies
    beforeEach(angular.mock.inject($injector => {
        $q = $injector.get('$q');
        <%= titleName %> = $injector.get('<%= titleName %>');
        ExampleService1 = $injector.get('ExampleService1');
        ExampleService2 = $injector.get('ExampleService2');
    }));

    // test the service
    it('exists', () => {
        expect(<%= titleName %>).toBeDefined();
    });

    // test each service method
    describe('isExample()', () => {
        it('is defined', () => {
            expect(<%= titleName %>.isExample).toBeDefined();
            expect(<%= titleName %>.isExample).toEqual(jasmine.any(Function));
        });
    });

});
