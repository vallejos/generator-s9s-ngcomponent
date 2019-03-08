<%= titleName %>Controller.$inject = [
    // inject depedencies here
];

/**
 * <%= camelName %> controller implementation
 * @constructor
 * @namespace Controllers
 */
export default function <%= titleName %>Controller() {
    // internal variables
    const vm = this;

    // public variables
    vm.myVar = 'some value';

    // public methods
    vm.$onChanges = $onChanges;
    vm.$onDestroy = $onDestroy;
    vm.$onInit = $onInit;

    /////////////////

    /**
     * Handle controller initialization
     */
    function $onInit() {
        // do something
    }

    /**
     * Handle binding updates
     * @param {Object} changes
     */
    function $onChanges(changes) {
        // do something
    }

    /**
     * Handle scope destruction
     */
    function $onDestroy() {
        // do something
    }

}