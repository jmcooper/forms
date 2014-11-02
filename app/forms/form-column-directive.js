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
            appendField(label);
        }

        function appendSelectList() {
            var selectList = angular.element('<select ng-model="' + ngModel + '" ng-options="option.label for option in column.field.options"></select>');
            appendField(selectList);
        }

        function appendTextBox() {
            var textBox;
            if ($scope.column.field.textBox.lines && $scope.column.field.textBox.lines > 1)
                textBox = angular.element('<br/><textarea ng-model="' + ngModel + '" rows="{{column.field.textBox.lines}}>"></textarea>');
            else
                textBox = angular.element('<input ng-model="' + ngModel + '" type="text" />');

            appendField(textBox);
        }

        function appendField(fieldElement) {
            if (field.displayRules && field.displayRules.length > 0)
                div.attr('ng-show', buildShowStatement());

            div = $compile(div)($scope);
            div.append($compile(fieldElement)($scope));
        }

        function buildShowStatement() {
            var statement = '';
            angular.forEach(field.displayRules, function(rule) {
                if (statement)  statement += ' && ';
                statement += buildShowStatementForRule(rule);
            });
            return statement;
        }

        function buildShowStatementForRule(rule) {
            var statement = '';
            var operator = rule.or ? ' || ' : ' && ';

            angular.forEach(rule.conditions, function(condition) {
                if (statement)  statement += operator;

                if (condition.numericCompareFieldId1) {
                    statement += 'parseFloat(formPageData.field' + condition.numericCompareFieldId1 + ')' + condition.comparison + ' parseFloat(formPageData.field' + condition.numericCompareFieldId2 + ')';
                } else if (condition.dateCompareFieldId1) {
                    statement += 'parseDate(formPageData.field' + condition.dateCompareFieldId1 + ')' + condition.comparison + ' parseDate(formPageData.field' + condition.dateCompareFieldId2 + ')';
                } else {
                    statement += 'formPageData.field' + condition.fieldId + '.value=="' + condition.value + '"';
                }
            });
            return '(' + statement + ')';
        }
    });
