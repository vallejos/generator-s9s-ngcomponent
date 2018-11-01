/**
 * <%= componentName %> Directive Test
 * @namespace Tests
 */
describe('<%= componentName %> directive', function () {
    'use strict';

    // variables
    var $scope, $rootScope, $compile;
    var directive;

    // mocks
    var someMock = {};

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
    beforeEach(module(function ($provide) {

    }));

    // inject the providers for the directive controller dependencies
    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');

        $scope = $rootScope.$new();
    }));

    // get the compiled directive
    beforeEach(function () {
        var myAttr = "an example value";
        directive = getCompiledDirective(myAttr);
    });

    // test the directive
    it('should compile the template', function () {
        expect(directive.html()).toBeDefined();
        expect(directive.html()).not.toBe(null);
        expect(directive.html()).not.toEqual('');
    });

    it('should show some html', function () {
        expect(directive.find('.<%= className %>').length).toBe(1);
    });

});
