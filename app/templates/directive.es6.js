/**
 * <%= componentName %> Directive
 * <%= componentName %> directive implementation
 * 
 * @namespace Directives
 */
(() => {
    'use strict';

    angular
        .module('<%= moduleName %>')
        .directive('<%= componentName %>', <%= componentName %>Directive);

    function <%= componentName %>Directive() {
        const directive = {
            restrict: 'EC', // change this as required
            scope: {
                // insert your directive's attributes here
                myAttr: '&'
            },
            templateUrl: '<%= templateUrlPrefix %>/<%= componentName %>/<%= componentName %>.html',
            controller: '<%= controllerName %> as vm',
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

})();
