import <%= titleName %>Module from './<%= camelName %>.module.js';

/**
 * <%= titleName %> model tests
 * @namespace Tests
 */
describe('<%= titleName %> model', () => {
    // variables
    let <%= titleName %>, ExampleService1, ExampleService2;

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

    // inject the providers for the model service dependencies and get the model service
    beforeEach(angular.mock.inject($injector => {
        <%= titleName %> = $injector.get('<%= titleName %>').<%= titleName %>;
        ExampleService1 = $injector.get('ExampleService1');
        ExampleService2 = $injector.get('ExampleService2');
    }));

    // test the model
    it('exists', () => {
        expect(<%= titleName %>).toBeDefined();
    });

    // test each model method

});
