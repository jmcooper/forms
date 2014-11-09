formsModule
    .directive('hiddenField', function() {
        return {
            restrict: 'E',
            scope: {
                field: '=',
                formPageData: '='
            },
            template: '<input type="hidden"></div>',
            replace: true,
            link: function(scope, element, attrs, form) {
                scope.formPageData['field' + scope.field.id] = scope.field.value;
                element.attr('ng-model', scope.formPageData['field' + scope.field.id]);
            }
        };
    });
