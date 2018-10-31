/**
 * <%= componentName %> Controller
 * <%= componentName %> controller implementation
 * 
 * @namespace Controllers
 */
(() => {
    'use strict';

    angular
        .module('<%= moduleName %>')
        .controller('<%= controllerName %>', <%= controllerName %>);

    <%= controllerName %>.$inject = [
        // inject depedencies here
    ];

    /**
     * <%= componentName %> Controller
     * 
     * @constructor
     */
    function <%= controllerName %>() {
        // internal variables
        const vm = this;

        // public methods
        vm.$onInit = onInit;
        vm.$onChanges = onChanges;

        // public variables
        vm.myVar = 'some value';

        /////////////////

        /**
         * Handle Controller Initialization
         */
        function onInit() {
            // do something

        }

        /**
         * Handle Updates
         */
        function onChanges() {
            // do something

        }


    }

})();
