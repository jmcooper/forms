formsModule
    .directive('formColumn', function() {
        return {
            restrict: 'E',
            scope: {
                column: '=',
                formPageData: '='
            },
            template: '<div class="col-md-{{column.width}}"></div>',
            replace: true,
            controller: 'FormColumnController',
            controllerAs: 'formColumnController'
        };
    })
    .controller('FormColumnController', function($scope, $element, $attrs, $transclude, $compile) {
        var div = angular.element('<div class="field"></div>');
        var ngModel = 'formPageData.field' + $scope.column.field.id;

        if ($scope.column.field.label)
            appendLabel();

        if ($scope.column.field.options && $scope.column.field.options.length > 0)
            appendSelectList();

        if ($scope.column.field.textBox)
            appendTextBox();

        $element.append(div);

        function appendLabel() {
            var label = angular.element('<span class="field-label">{{column.field.label}}</span>');
            div.append($compile(label)($scope));
        }

        function appendSelectList() {
            var selectList = angular.element('<select ng-model="' + ngModel + '" ng-options="option.label for option in column.field.options"></select>');
            div.append($compile(selectList)($scope));
        }

        function appendTextBox() {
            var textBox;
            if ($scope.column.field.textBox.lines && $scope.column.field.textBox.lines > 1)
                textBox = angular.element('<br/><textarea rows="{{column.field.textBox.lines}}>"></textarea>');
            else
                textBox = angular.element('<input type="text" />');

            div.append($compile(textBox)($scope));
        }
    });
