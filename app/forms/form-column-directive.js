formsModule
    .directive('formColumn', function() {
        return {
            restrict: 'E',
            scope: {
                column: '='
            },
            template: '<div class="col-md-{{column.width}}">Column</div>',
            replace: true,
            controller: 'FormColumnController',
            controllerAs: 'ctrl'
        };
    })
    .controller('FormColumnController', function($scope, $element, $attrs, $transclude, $compile) {

    });
