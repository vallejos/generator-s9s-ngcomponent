/**
 * <%= componentName %> Component Test
 * @namespace Tests
 */
describe('<%= componentName %> component', () => {
    'use strict';

    // variables
    let $scope, $rootScope, $compile;
    let component;

    // mocks
    const someMock = {};

    // helper functions
    const getCompiledComponent = (myAttr) => {
        $scope.myAttr = myAttr;

        const element = angular.element('<<%= htmlElementName %> my-attr="myAttr"></<%= htmlElementName %>>');
        component = $compile(element)($scope);

        $scope.$digest();
        return component;
    }

    // load required modules
    beforeEach(module('<%= tplModuleName %>')); // templates
    beforeEach(module('<%= moduleName %>')); // our module

    // provide mocks and global constants
    beforeEach(module(($provide) => {
        $provide.value('CCClusterService', CCClusterServiceMock);
        $provide.constant('CCClusterService', CCClusterServiceMock);

    }));

    // inject the providers for the component controller dependencies
    beforeEach(inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');

        $scope = $rootScope.$new();
    }));

    // get the compiled component
    beforeEach(() => {
        let myAttr = 'some-value';
        component = getCompiledComponent(myAttr);
    });

    // test the component
    it('should compile the template', () => {
        expect(component.html()).toBeDefined();
        expect(component.html()).not.toBe(null);
        expect(component.html()).not.toEqual('');
    });

    it('should show some html', () => {
        expect(component.find('.<%= className %>').length).toBe(1);
    });

});
