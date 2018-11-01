/**
 * <%= componentName %> Service
 * <%= componentName %> service implementation
 * 
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
     * <%= serviceName %> Service
     * 
     * @namespace <%= serviceName %>
     * @memberOf Services
     */
    function <%= serviceName %>() {

        // define the exported service methods
        return {
            isExample: isExample
        };

        //////////////////////////////////////////////
        // implement the methods below
        //////////////////////////////////////////////

        /**
         * Just an example method
         * 
         * @returns {boolean}
         */
        function isExample() {
            return false;
        }

    }

})();
