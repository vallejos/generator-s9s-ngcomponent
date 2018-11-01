/**
 * <%= componentName %> Component Test
 * @namespace Tests
 */
describe('<%= componentName %> component', function () {
    'use strict';

    // variables
    var $scope, $rootScope, $compile;
    var component;

    // mocks
    var someMock = {};

    // helper functions
    function getCompiledComponent(myAttr) {
        $scope.myAttr = myAttr;

        var element = angular.element('<<%= htmlElementName %> my-attr="myAttr"></<%= htmlElementName %>>');
        component = $compile(element)($scope);

        $scope.$digest();
        return component;
    }

    // load required modules
    beforeEach(module('<%= templateModuleName %>')); // templates
    beforeEach(module('<%= moduleName %>')); // our module

    // provide mocks and global constants
    beforeEach(module(function ($provide) {

    }));

    // inject the providers for the component controller dependencies
    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');

        $scope = $rootScope.$new();
    }));

    // get the compiled component
    beforeEach(function () {
        var myAttr = 'some-value';
        component = getCompiledComponent(myAttr);
    });

    // test the component
    it('should compile the template', function () {
        expect(component.html()).toBeDefined();
        expect(component.html()).not.toBe(null);
        expect(component.html()).not.toEqual('');
    });

    it('should show some html', function () {
        expect(component.find('.<%= className %>').length).toBe(1);
    });

});
