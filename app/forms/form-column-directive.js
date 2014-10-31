formsModule
    .directive('formColumn', function() {
        return {
            restrict: 'E',
            scope: {
                column: '='
            },
            template: '<span></span>',
            replace: true,
            controller: 'FormColumnController',
            controllerAs: 'ctrl'
        };
    })
    .controller('FormColumnController', function($scope, $element, $attrs, $transclude, $compile) {
//        var html = '<div class="col-md-"' + $scope.column.width + '><input type="text"/></div>';
//
//        $compile(html)($scope).appendTo($element);
    });
