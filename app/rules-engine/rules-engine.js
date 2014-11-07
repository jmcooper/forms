formsModule.factory('rulesEngine', function() {
    return {
        buildRuleExpression: function(field) {
            return buildExpression(field);
        }
    };

    function buildExpression(field) {
        var expression = '';
        angular.forEach(field.displayRules, function(rule) {
            if (expression)  expression += ' && ';
            expression += buildExpressionForRule(rule);
        });
        return expression;
    }

    function buildExpressionForRule(rule) {
        var expression = '';
        var operator = rule.or ? ' || ' : ' && ';

        angular.forEach(rule.conditions, function(condition) {
            if (expression)  expression += operator;

            if (condition.numericCompareFieldId1) {
                expression += '(formPageData.field' + condition.numericCompareFieldId1 + ' | parseFloat) ' + condition.comparison + ' (formPageData.field' + condition.numericCompareFieldId2 + ' | parseFloat)';
            } else if (condition.dateCompareFieldId1) {
                expression += '(formPageData.field' + condition.dateCompareFieldId1 + ' | parseDate) ' + condition.comparison + ' (formPageData.field' + condition.dateCompareFieldId2 + ' | parseDate)';
            } else {
                expression += 'formPageData.field' + condition.fieldId + '.value==\'' + condition.value + '\'';
            }
        });
        return '' + expression + '';
    }
});