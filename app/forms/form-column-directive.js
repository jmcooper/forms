formsModule
    .directive('formColumn', function($compile, rulesEngine) {
        return {
            restrict: 'E',
            scope: {
                column: '=',
                formPageData: '='
            },
            template: '<div ng-class="getFormGroupClass(this)"></div>',
            replace: true,
            require: '^form',
            controller: 'FormColumnController',
            controllerAs: 'formColumnController',
            link: function(scope, element, attrs, form) {
                var field = scope.column.field;
                var ngModel = 'formPageData.field' + field.id;

                scope.form = form;

                if (field.label)
                    appendLabel();

                if (field.options && field.options.length > 0)
                    appendSelectList();

                if (field.textBox)
                    appendTextBox();

                function appendLabel() {
                    var label = angular.element('<span class="field-label control-label">{{column.field.label}}</span>');
                    appendField(label, false);
                }

                function appendSelectList() {
                    var selectList = angular.element('<select class="form-control" ng-model="' + ngModel + '" ng-options="option.label for option in column.field.options"></select>');
                    appendField(selectList, true);
                }

                function appendTextBox() {
                    var textBox;
                    if (scope.column.field.textBox.lines && scope.column.field.textBox.lines > 1)
                        textBox = angular.element('<br/><textarea class="form-control" name="field' + field.id + '" ng-model="' + ngModel + '" rows="{{column.field.textBox.lines}}>"></textarea>');
                    else
                        textBox = angular.element('<input class="form-control" name="field' + field.id + '" ng-model="' + ngModel + '" type="text" />');

                    appendField(textBox, true);
                }

                function appendField(fieldElement, validate) {
                    var div = angular.element('<div></div>');

                    if (field.displayRules && field.displayRules.length > 0)
                        div.attr('ng-show', rulesEngine.buildRuleExpression(field));

                    if (validate && field.validation) {
                        fieldElement.attr('validation', '');
                        if (field.validation.required) {
                            fieldElement.attr('required', 'required');
                        }
                    }
                    var divField = fieldElement.appendTo(div);
                    var result = $(divField).appendTo(element);
                    $compile(result)(scope);
                }
            }
        };
    })
    .controller('FormColumnController', function($scope) {
        $scope.getFormGroupClass = function() {
            var result = "form-group col-md-" + $scope.column.width;
            var field = $scope.form['field' + $scope.column.field.id];
            if ($scope.column.field.validation && field.$invalid && field.$dirty ) {
                result += " has-error";
            }
            return result
        };
    });
