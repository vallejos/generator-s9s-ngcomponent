/**
 * <%= modelName %> Model Test
 * @namespace Tests
 */
describe('<%= modelName %> Model', () => {
    'use strict';

    // variables
    let <%= model %>;

    // mocks
    const someMock = {};

    // helper functions
    function someHelp() {
        return;
    }

    // load required modules
    beforeEach(module('<%= moduleName %>')); // our module

    // provide mocks and global constants
    beforeEach(module('<%= moduleName %>', ($provide) => {
        $provide.constant('Immutable', Immutable); // required by ES5 model
    }));

    // inject the providers for the model service dependencies and get the model service
    beforeEach(inject(($injector) => {
        <%= model %> = $injector.get('<%= modelName %>').<%= model %>;
    }));

    // test the model
    it('should exist', () => {
        expect(<%= model %>).toBeDefined();
    });

    // test each model method

});
