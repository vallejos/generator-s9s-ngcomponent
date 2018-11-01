<%= titleName %>Service.$inject = [];

 /**
 * <%= titleName %> service implementation
 * @constructor
 * @namespace Services
 */
export default function <%= titleName %>Service() {

    // define the exported service methods/properties
    return {
        isExample
    };

    /////////////////

    /**
     * Determines whether the service is an example or not
     * @returns {boolean}
     */
    function isExample() {
        return true;
    }

}
