formsModule
    .directive('hiddenField', function($location) {
        return {
            restrict: 'E',
            scope: {
                field: '=',
                formPageData: '='
            },
            template: '<input type="hidden"></div>',
            replace: true,
            link: function(scope, element, attrs, form) {
                scope.formPageData['field' + scope.field.id] = getDefaultValue(scope.field);
                element.attr('ng-model', scope.formPageData['field' + scope.field.id]);

            }
        };

        function getDefaultValue(field) {
            var valueFromQueryString = $location.search()['field' + field.id];

            return valueFromQueryString ? valueFromQueryString : field.value;
        }

    });
