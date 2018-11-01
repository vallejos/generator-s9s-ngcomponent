import <%= titleName %>Module from './<%= camelName %>.module.js';

/**
 * <%= camelName %> component tests
 * @namespace Tests
 */
describe('<%= camelName %> component', () => {
    // variables
    let <%= !useS9SDependencies ? '$compile, ' : '' %>$scope, component;

    // mocks
    const ExampleService1Mock = {};
    const ExampleService2Mock = {};

    // helper functions
    const getCompiledComponent = bindings => {
        Object.assign($scope, bindings);
        <%_ if (useS9SDependencies) { -%>
        return CCTestH.getCompiledComponent(
            '<<%= kebabName %> my-attr="myAttr"></<%= kebabName %>>',
            $scope
        );
        <%_ } else { -%>

        const compiled = $compile(
            angular.element('<<%= kebabName %> my-attr="myAttr"></<%= kebabName %>>')
        )($scope);

        $scope.$digest();
        return compiled;
        <%_ } -%>
    };

    // load required modules
    beforeEach(angular.mock.module(<%= titleName %>Module));

    // provide mocks and global constants
    beforeEach(angular.mock.module($provide => {
        $provide.constant('ExampleService1', ExampleService1Mock);
        $provide.value('ExampleService2', ExampleService2Mock);
    }));

    // inject the providers for the component controller dependencies
    beforeEach(angular.mock.inject($injector => {
        <%_ if (!useS9SDependencies) { -%>
        $compile = $injector.get('$compile');
        <%_ } -%>
        $scope = $injector.get('$rootScope').$new();
    }));

    // get the compiled component
    beforeEach(() => {
        component = getCompiledComponent({
            myAttr: 'some-value'
        });
    });

    // test the component
    it('compiles the template', () => {
        expect(component.html()).toBeDefined();
        expect(component.html()).not.toBe(null);
        expect(component.html()).not.toEqual('');
    });

    it('shows some html', () => {
        <%_ if (useS9SDependencies) { -%>
        expect(component.find('.<%= kebabName %>')).toExist();
        <%_ } else { -%>
        expect(component.find('.<%= kebabName %>').length).toBe(1);
        <%_ } -%>
    });

});
