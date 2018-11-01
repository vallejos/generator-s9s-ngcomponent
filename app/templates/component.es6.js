/**
 * <%= componentName %> Component
 * <%= componentName %> component definition
 * 
 * @namespace Components
 */
(() => {
    'use strict';

    angular
        .module('<%= moduleName %>')
        .component('<%= componentName %>', {
            bindings: {
                // add attributes for the component here
                myAttr: '<'
            },
            controller: '<%= controllerName %> as vm',
            templateUrl: '<%= templateUrlPrefix %>/<%= componentName %>/<%= componentName %>.html'
        });

})();
