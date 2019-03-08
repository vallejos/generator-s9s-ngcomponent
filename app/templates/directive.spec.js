import <%= titleName %>Module from './<%= camelName %>.module.js';

/**
 * <%= camelName %> directive tests
 * @namespace Tests
 */
describe('<%= camelName %> directive', () => {
    // variables
    let <%= !useS9SDependencies ? '$compile, ' : '' %>$scope, directive, ExampleService1, ExampleService2;

    // mocks
    const ExampleService1Mock = {};
    const ExampleService2Mock = {};

    // helper functions
    const getCompiledDirective = bindings => {
        Object.assign($scope, bindings);
        <%_ if (useS9SDependencies) { -%>
        return CCTestH.getCompiledDirective(
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
        $provide.value('ExampleService1', ExampleService1Mock);
        $provide.value('ExampleService2', ExampleService2Mock);
    }));

    // inject the providers for the directive controller dependencies
    beforeEach(angular.mock.inject($injector => {
        <%_ if (!useS9SDependencies) { -%>
        $compile = $injector.get('$compile');
        <%_ } -%>
        $scope = $injector.get('$rootScope').$new();
        ExampleService1 = $injector.get('ExampleService1');
        ExampleService2 = $injector.get('ExampleService2');
    }));

    // get the compiled directive
    beforeEach(() => {
        directive = getCompiledDirective({
            myAttr: 'some-value'
        });
    });

    // test the directive
    it('compiles the template', () => {
        expect(directive.html()).toBeDefined();
        expect(directive.html()).not.toBe(null);
        expect(directive.html()).not.toEqual('');
    });

    it('shows some html', () => {
        <%_ if (useS9SDependencies) { -%>
        expect(directive.find('.<%= kebabName %>')).toExist();
        <%_ } else { -%>
        expect(directive.find('.<%= kebabName %>').length).toBe(1);
        <%_ } -%>
    });

});
