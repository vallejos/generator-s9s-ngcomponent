import controller from './<%= camelName %>.controller.js';
import templateUrl from './<%= camelName %>.html';
//import './<%= camelName %>.scss';

/**
 * <%= camelName %> component definition
 * @namespace Components
 */
export default {
    bindings: {
        // add attributes for the component here
        myAttr: '<'
    },
    controller,
    controllerAs: 'vm',
    templateUrl
};
