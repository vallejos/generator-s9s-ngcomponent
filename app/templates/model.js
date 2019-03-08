<%= titleName %>Model.$inject = ['Immutable'];

/**
 * <%= titleName %> model definition and implementation
 * @namespace Models
 */
export default function <%= titleName %>Model(Immutable) {
    /**
     * <%= titleName %> Model
     * @type {Immutable.Record}
     */
    const <%= titleName %> = Immutable.Record({
        id: null,
        type: null
    });

    // define constants used in the model
    <%= titleName %>.TYPE_EXAMPLE = 'example';

    // prototype methods for the model
    <%= titleName %>.prototype.isExample = isExample;

    /////////////////

    /**
     * Determines whether the model is an example or not
     * @returns {boolean}
     */
    function isExample() {
        return this.type === <%= titleName %>.TYPE_EXAMPLE;
    }

    // define the final export
    return {
        <%= titleName %>
    };

}
