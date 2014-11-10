formsModule
    .directive('formColumn', function($compile, rulesEngine, $location, parseDateFilter, parseFloatFilter) {
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


                if (field.label && field.dataType !== 'location')
                    appendLabel();

                if (field.options && field.options.length > 0)
                    appendSelectList();

                if (field.textBox)
                    appendTextBox();

                if (field.dataType === 'location') {
                    appendLocationButton();
                }

                var defaultValue = getDefaultValue();
                if (defaultValue) {
                    if (scope.form['field' + field.id]) {
                        scope.form['field' + field.id].$setViewValue(defaultValue);
                        scope.form['field' + field.id].$render();
                    }
                }

            }
        };

        function getDefaultValue() {
            var valueFromQueryString = $location.search()['field' + field.id];
            var parsedValue = valueFromQueryString;
            if (field.dataType==='date')
                parsedValue = parseDateFilter(valueFromQueryString);
            else if (field.dataType==='integer' || field.dataType==='decimal')
                parsedValue = parseFloatFilter(valueFromQueryString);

            return parsedValue ? parsedValue : field.defaultValue;
        }

        function appendLabel() {
            var label = angular.element('<span class="field-label control-label">{{column.field.label}}</span>');
            appendField(label, false);
        }

        function appendLocationButton() {
            var button = angular.element('<button class="btn" ng-click="captureLocation(' + field.id + ')">{{column.field.label}}</span>');
            appendField(button, false);
            var locationSpan = angular.element('<span>{{formPageData.field' + field.id + '}}</span>');
            appendField(locationSpan, false);
        }

        function appendSelectList() {
            var selectList = angular.element('<select class="form-control" name="field' + field.id + '" ng-model="' + ngModel + '" ng-options="option.label as option.value for option in column.field.options"></select>');
            appendField(selectList, true);
        }

        function appendTextBox() {
            var textBox;
            if (field.textBox.lines && field.textBox.lines > 1)
                textBox = angular.element('<br/><textarea class="form-control" name="field' + field.id + ' rows="{{column.field.textBox.lines}}" ng-trim="true"></textarea>');
            else
                textBox = angular.element('<input class="form-control" name="field' + field.id + '" type="' + getInputType(field.dataType) + '" ng-trim="true"/>');

            if (field.readyOnlyValue) {
                textBox.attr('disabled', 'true');
                textBox.attr('value', field.readyOnlyValue);
            }
            else
                textBox.attr('ng-model', ngModel);

            appendField(textBox, true);
        }

        function appendField(fieldElement, validate) {
            if (validate && (field.validation || field.dataType)) {
                fieldElement.attr('validation', field.displayName ? field.displayName : field.label);
                if (field.validation) {
                    if (field.validation.required)
                        fieldElement.attr('required', 'required');

                    if (!field.validation.required && field.validation.requiredValueRules && field.validation.requiredValueRules.rules && field.validation.requiredValueRules.rules.length > 0) {
                        fieldElement.attr('ng-required', rulesEngine.buildRuleExpression(field.validation.requiredValueRules.rules));
                        if (field.validation.requiredValueRules.validationMessage) {
                            fieldElement.attr('ng-required-message', field.validation.requiredValueRules.validationMessage);
                        }
                    }

                    if (field.dataType)
                        fieldElement.attr(field.dataType, '');

                    if (field.validation.min)
                        fieldElement.attr('min', field.validation.min);

                    if (field.validation.max)
                        fieldElement.attr('max', field.validation.max);

                    if (field.validation.minlength)
                        fieldElement.attr('ng-minlength', field.validation.minlength);

                    if (field.validation.maxlength)
                        fieldElement.attr('ng-maxlength', field.validation.maxlength);

                    if (field.validation.pattern)
                        fieldElement.attr('ng-pattern', '/' + field.validation.pattern + '/');
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
    .controller('FormColumnController', function($scope, rulesEngine, $window) {
        var displayRule = rulesEngine.buildRuleExpression($scope.column.field.displayRules, $scope.allFields);

        $scope.getFormGroupClass = function () {
            var result = "form-group col-md-" + $scope.column.width;
            var field = $scope.form['field' + $scope.column.field.id];

            if ($scope.column.field.validation && field && field.$invalid && field.$dirty) {
                result += " has-error";
            }
            return result
        };

        $scope.show = function() {
            if ($scope.column.field.displayRules && $scope.column.field.displayRules.length > 0) {
                return $scope.$eval(displayRule);
            }

            return true;
        };

        $scope.captureLocation = function(fieldId) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    $scope.formPageData['field' + fieldId] = position;
                },
                function() {
                    $scope.formPageData['field' + fieldId] = 'unavailable';
                },
                {maximumAge:0, timeout:10}
            );
        }
    });
