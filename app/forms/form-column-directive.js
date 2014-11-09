formsModule
    .directive('formColumn', function($compile) {
        var directiveScope, directiveElement, field, ngModel;
        return {
            restrict: 'E',
            scope: {
                column: '=',
                formPageData: '=',
                allFields: '='
            },
            template: '<div ng-class="getFormGroupClass()" ng-show="show()" ></div>',
            replace: true,
            require: '^form',
            controller: 'FormColumnController',
            controllerAs: 'formColumnController',
            link: function(scope, element, attrs, form) {
                directiveScope = scope;
                directiveElement = element;
                field = directiveScope.column.field;
                ngModel = 'formPageData.field' + field.id;
                scope.form = form;

                if (field.label)
                    appendLabel();

                if (field.options && field.options.length > 0)
                    appendSelectList();

                if (field.textBox)
                    appendTextBox();
            }
        };

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
            if (field.textBox.lines && field.textBox.lines > 1)
                textBox = angular.element('<br/><textarea class="form-control" name="field' + field.id + '" ng-model="' + ngModel + '" rows="{{column.field.textBox.lines}}" ng-trim="true"></textarea>');
            else
                textBox = angular.element('<input class="form-control" name="field' + field.id + '" ng-model="' + ngModel + '" type="' + getInputType(field.dataType) + '" ng-trim="true"/>');

            appendField(textBox, true);
        }

        function appendField(fieldElement, validate) {
            if (validate && (field.validation || field.dataType)) {
                fieldElement.attr('validation', field.displayName ? field.displayName : field.label);
                if (field.validation) {
                    if (field.validation.required)
                        fieldElement.attr('required', 'required');

                    if (field.dataType)
                        fieldElement.attr(field.dataType, '');

                    if (field.validation.min)
                        fieldElement.attr('min', field.validation.min);

                    if (field.validation.max)
                        fieldElement.attr('max', field.validation.max);

                    if (field.validation.minlength) {
                        fieldElement.attr('ng-minlength', field.validation.minlength);
                        console.log(field.validation.minlength);
                    }

                    if (field.validation.maxlength)
                        fieldElement.attr('ng-maxlength', field.validation.maxlength);

                    if (field.validation.pattern) {
                        fieldElement.attr('ng-pattern', '/' + field.validation.pattern + '/');
                        console.log(fieldElement[0])
                        console.log(field.validation.pattern);
                    }
                }
            }
            var result = $(fieldElement).appendTo(directiveElement);
            $compile(result)(directiveScope);
        }

        function getInputType(dataType) {
            if (dataType === 'integer' || dataType === 'decimal') {
                return 'number';
            }
            if (dataType === 'date') {
                return 'date';
            }
            return 'text';
        }
    })
    .controller('FormColumnController', function($scope, rulesEngine) {
        var displayRule = rulesEngine.buildRuleExpression($scope.column.field, $scope.allFields);

        $scope.getFormGroupClass = function () {
            var result = "form-group col-md-" + $scope.column.width;
            var field = $scope.form['field' + $scope.column.field.id];
            if ($scope.column.field.validation && field.$invalid && field.$dirty) {
                result += " has-error";
            }
            return result
        };

        $scope.show = function() {
            if ($scope.column.field.displayRules && $scope.column.field.displayRules.length > 0)
                return $scope.$eval(displayRule);

            return true;
        };
    });
