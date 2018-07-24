/**
 * <%= componentName %> Model
 * @desc <%= componentName %> model definition and implementation
 * @namespace Models
 */
(() => {
    'use strict';

    angular
        .module('<%= moduleName %>')
        .service('<%= modelName %>', <%= modelName %>);

    <%= modelName %>.$inject = ['Immutable'];

    /**
     * @namespace <%= modelName %>
     * @desc Defines <%= model %> model.
     * @param {Immutable} Immutable
     * @memberOf Models
     */
    function <%= modelName %>(Immutable) {
        //////////////////////////////////////////////
        // Definition of the Model
        //////////////////////////////////////////////

        /**
         * <%= model %> Model
         * @type {Immutable.Record}
         */
        let <%= model %> = Immutable.Record({
            id: null,
            type: null
        });

        // define constants used in the model
        <%= model %>.TYPE_EXAMPLE = 'example';

        // prototype methods for the model
        <%= model %>.prototype.isExample = isExample;

        //////////////////////////////////////////////
        // Implementation of the Prototype methods
        //////////////////////////////////////////////

        /**
         * Returns whether the model is an example or not
         * @return {boolean}
         */
        function isExample() {
            return this.type === <%= model %>.TYPE_EXAMPLE;
        }

        //////////////////////////////////////////////
        // the exported final service
        //////////////////////////////////////////////
        const service = {
            <%= model %>: <%= model %>
        };

        return service;
    }

})();
