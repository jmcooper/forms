formsModule
    .directive('formRow', function() {
        return {
            restrict: 'E',
            scope: {
                row: '='
            },
            template: '<div><form-column ng-repeat="column in row.columns" column="column"/></div>',
            replace: true,
            controller: 'FormRowController',
            controllerAs: 'ctrl'
        };
    })
    .controller('FormRowController', function() {

    });
