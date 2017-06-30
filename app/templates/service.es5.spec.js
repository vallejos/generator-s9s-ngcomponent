/**
 * <%= serviceName %> Service Test
 * @namespace Tests
 */
describe('<%= serviceName %> Service', function () {
    'use strict';

    // variables
    var $q;
    var <%= serviceName %>, SomeService;

    // mocks
    var SomeServiceMock = {};

    // helper functions
    function someHelp() {
        return;
    }

    // load required modules
    beforeEach(module('<%= moduleName %>')); // our module

    // provide mocks and global constants
    beforeEach(module('<%= moduleName %>', function ($provide) {
        $provide.constant('Immutable', Immutable);
        $provide.constant('_', _);
        $provide.value('SomeService', SomeServiceMock);
    }));

    // inject the providers for the service dependencies
    beforeEach(inject(function ($injector) {
        $q = $injector.get('$q');
        SomeService = $injector.get('SomeService');
        <%= serviceName %> = $injector.get('<%= serviceName %>');
    }));

    // test the service
    it('should exist', function () {
        expect(<%= serviceName %>).toBeDefined();
    });

    // test each service method
    describe('isExample() method', function () {
        it('should be defined', function () {
            expect(<%= serviceName %>.isExample).not.toBeUndefined();
            expect(typeof <%= serviceName %>.isExample).toEqual('function');
        });
    })

});
