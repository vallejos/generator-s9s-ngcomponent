/**
 * <%= componentName %> Service
 * @desc <%= componentName %> service implementation
 * @namespace Services
 */
(() => {
    'use strict';

    angular
        .module('<%= moduleName %>')
        .service('<%= serviceName %>', <%= serviceName %>);

    // inject service dependencies
    <%= serviceName %>.$inject = [];

    /**
     * @namespace <%= serviceName %>
     * @desc <%= serviceName %> Service
     * @memberOf Services
     */
    function <%= serviceName %>() {

        // define the exported service methods
        const service = {
            isExample: isExample
        };

        return service;

        //////////////////////////////////////////////
        // implement the methods below
        //////////////////////////////////////////////

        /**
         * @name isExample
         * @desc just an example method
         * @returns {boolean}
         */
        function isExample() {
            return false;
        }

    }

})();
