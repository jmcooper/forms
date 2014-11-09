formsModule.factory('rulesEngine', function() {
    return {
        buildRuleExpression: function(rules, allFields) {
            var expression = '';
            angular.forEach(rules, function(rule) {
                if (expression)  expression += ' && ';
                expression += buildExpressionForRule(rule, allFields);
            });
            return expression;
        }
    };

    function buildExpressionForRule(rule, allFields) {
        var expression = '';
        var operator = rule.or ? ' || ' : ' && ';

        angular.forEach(rule.conditions, function(condition) {
            if (expression)  expression += operator;

            if (condition.compareFieldId1) {
                var dataType = _.find(allFields, {id: condition.compareFieldId1}).dataType;
                var parser = dataType === 'date' ? 'parseDate' : 'parseFloat';
                if (condition.compareFieldId2)
                    expression += '(formPageData.field' + condition.compareFieldId1 + ' | ' + parser + ') ' + condition.comparison + ' (formPageData.field' + condition.compareFieldId2 + ' | ' + parser + ')';
                else
                    expression += '(formPageData.field' + condition.compareFieldId1 + ' | ' + parser + ') ' + condition.comparison + '(\'' + condition.value + '\' | ' + parser + ')';
            } else {
                expression += 'formPageData.field' + condition.fieldId + '===\'' + condition.value + '\'';
            }
        });
        return '' + expression + '';
    }
});