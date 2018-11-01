/**
 * <%= componentName %> Directive Test
 * @namespace Tests
 */
describe('<%= componentName %> directive', () => {
    'use strict';

    // variables
    let $scope, $rootScope, $compile;
    let directive;

    // mocks
    const someMock = {};

    // helper functions
    function getCompiledDirective(myAttr) {
        $scope.myAttr = myAttr;
        var element = angular.element('<<%= htmlElementName %> my-attr="myAttr"></<%= htmlElementName %>>');
        directive = $compile(element)($scope);

        $scope.$digest();
        return directive;
    }

    // load required modules
    beforeEach(module('<%= templateModuleName %>')); // templates
    beforeEach(module('<%= moduleName %>')); // our module

    // provide mocks and global constants
    beforeEach(module(($provide) => {

    }));

    // inject the providers for the directive controller dependencies
    beforeEach(inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');

        $scope = $rootScope.$new();
    }));

    // get the compiled directive
    beforeEach(() => {
        var myAttr = "an example value";
        directive = getCompiledDirective(myAttr);
    });

    // test the directive
    it('should compile the template', () => {
        expect(directive.html()).toBeDefined();
        expect(directive.html()).not.toBe(null);
        expect(directive.html()).not.toEqual('');
    });

    it('should show some html', () => {
        expect(directive.find('.<%= className %>').length).toBe(1);
    });

});
