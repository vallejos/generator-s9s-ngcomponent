import templateUrl from './<%= camelName %>.html';
//import './<%= camelName %>.scss';

/**
 * <%= camelName %> directive implementation
 * @namespace Directives
 */
export default function <%= titleName %>Directive() {
    const directive = {
        restrict: 'EC', // change this as required
        scope: {
            // insert your directive's attributes here
            myAttr: '&'
        },
        templateUrl,
        controller: '<%= titleName %>Controller as vm',
        bindToController: true
    };

    return directive;
}
