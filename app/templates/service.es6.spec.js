/**
 * <%= serviceName %> Service Test
 * @namespace Tests
 */
describe('<%= serviceName %> Service', () => {
    'use strict';

    // variables
    let $q;
    let <%= serviceName %>, SomeService;

    // mocks
    const SomeServiceMock = {};

    // helper functions
    function someHelp() {
        return;
    }

    // load required modules
    beforeEach(module('<%= moduleName %>')); // our module

    // provide mocks and global constants
    beforeEach(module('<%= moduleName %>', ($provide) => {
        $provide.constant('Immutable', Immutable);
        $provide.constant('_', _);
        $provide.value('SomeService', SomeServiceMock);
    }));

    // inject the providers for the service dependencies
    beforeEach(inject(($injector) => {
        $q = $injector.get('$q');
        SomeService = $injector.get('SomeService');
        <%= serviceName %> = $injector.get('<%= serviceName %>');
    }));

    // test the service
    it('should exist', () => {
        expect(<%= serviceName %>).toBeDefined();
    });

    // test each service method
    describe('isExample() method', () => {
        it('should be defined', () => {
            expect(<%= serviceName %>.isExample).not.toBeUndefined();
            expect(typeof <%= serviceName %>.isExample).toEqual('function');
        });
    })

});
