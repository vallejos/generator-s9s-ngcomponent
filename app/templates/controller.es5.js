/**
 * <%= componentName %> Controller
 * @desc <%= componentName %> controller implementation
 * @namespace Controllers
 */
(function () {
    'use strict';

    angular
        .module('<%= moduleName %>')
        .controller('<%= controllerName %>', <%= controllerName %>);

    <%= controllerName %>.$inject = [
        // inject depedencies here
    ];

    /**
     * <%= componentName %> Controller
     * @constructor
     */
    function <%= controllerName %>() {
        // internal variables
        var vm = this;

        // public methods
        vm.$onInit = onInit;
        vm.$onChanges = onChanges;

        // public variables
        vm.myVar = 'some value';

        /////////////////

        /**
         * Inits Controller.
         */
        function onInit() {
            // do something

        }

        /**
         * Handle Updates.
         */
        function onChanges() {
            // do something

        }


    }

})();
