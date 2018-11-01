/**
 * <%= camelName %> module definition
 * @namespace Modules
 */
import angular from 'angular';
<% if (type === TYPE_COMPONENT) { -%>
import <%= titleName %>Component from './<%= camelName %>.component.js';
<% } else if (type === TYPE_CONTROLLER) { -%>
import <%= titleName %>Controller from './<%= camelName %>.controller.js';
<% } else if (type === TYPE_DIRECTIVE) { -%>
import <%= titleName %>Controller from './<%= camelName %>.controller.js';
import <%= titleName %>Directive from './<%= camelName %>.directive.js';
<% } else if (type === TYPE_MODEL) { -%>
import <%= titleName %>Model from './<%= camelName %>.model.js';
<% } else if (type === TYPE_SERVICE) { -%>
import <%= titleName %>Service from './<%= camelName %>.service.js';
<% } -%>

export default angular
    .module('<%= moduleName %>', [
        // insert dependencies here
    ])
    <%_ if (type === TYPE_COMPONENT) { -%>
    .component('<%= prefix %><%= titleName %>', <%= titleName %>Component)
    <%_ } else if (type === TYPE_CONTROLLER) { -%>
    .controller('<%= titleName %>', <%= titleName %>Controller)
    <%_ } else if (type === TYPE_DIRECTIVE) { -%>
    .controller('<%= titleName %>Controller', <%= titleName %>Controller)
    .directive('<%= prefix %><%= titleName %>', <%= titleName %>Directive)
    <%_ } else if (type === TYPE_MODEL) { -%>
    .service('<%= titleName %>', <%= titleName %>Model)
    <%_ } else if (type === TYPE_SERVICE) { -%>
    .service('<%= titleName %>', <%= titleName %>Service)
    <%_ } -%>
    .name;
