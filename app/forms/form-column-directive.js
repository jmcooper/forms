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
    .controller('FormColumnController', function($scope, $element, $attrs, $transclude, $compile, rulesEngine) {
        var div = angular.element('<div class="field"></div>');
        var field = $scope.column.field;
        var ngModel = 'formPageData.field' + field.id;

        $scope.parseFloat = parseFloat;
        $scope.parseDate = Date.parse;

        if (field.label)
            appendLabel();

        if (field.options && field.options.length > 0)
            appendSelectList();

        if (field.textBox)
            appendTextBox();

        $element.append(div);

        function appendLabel() {
            var label = angular.element('<span class="field-label">{{column.field.label}}</span>');
            appendField(label, false);
        }

        function appendSelectList() {
            var selectList = angular.element('<select ng-model="' + ngModel + '" ng-options="option.label for option in column.field.options"></select>');
            appendField(selectList, true);
        }

        function appendTextBox() {
            var textBox;
            if ($scope.column.field.textBox.lines && $scope.column.field.textBox.lines > 1)
                textBox = angular.element('<br/><textarea ng-model="' + ngModel + '" rows="{{column.field.textBox.lines}}>"></textarea>');
            else
                textBox = angular.element('<input ng-model="' + ngModel + '" type="text" />');

            appendField(textBox, true);
        }

        function appendField(fieldElement, validate) {
            if (field.displayRules && field.displayRules.length > 0)
                div.attr('ng-show', rulesEngine.buildRuleExpression(field));

            if (validate && field.validation) {
                fieldElement.attr('validation', '');
                if (field.validation.required) {
                    fieldElement.attr('required', 'required');
                    console.log(fieldElement[0])
                }
            }
            div = $compile(div)($scope);
            div.append($compile(fieldElement)($scope));
        }


    });
