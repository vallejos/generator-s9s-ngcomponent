/**
 * <%= modelName %> Model Test
 * @namespace Tests
 */
describe('<%= modelName %> Model', function () {
    'use strict';

    // variables
    var <%= model %>;

    // mocks
    var someMock = {};

    // helper functions
    function someHelp() {
        return;
    }

    // load required modules
    beforeEach(module('<%= moduleName %>')); // our module

    // provide mocks and global constants
    beforeEach(module('<%= moduleName %>', function ($provide) {
        $provide.constant('Immutable', Immutable); // required by ES5 model
    }));

    // inject the providers for the model service dependencies and get the model service
    beforeEach(inject(function ($injector) {
        <%= model %> = $injector.get('<%= modelName %>').<%= model %>;
    }));

    // test the model
    it('should exist', function () {
        expect(ClusterDashboard).toBeDefined();
    });

    // test each model method

});
