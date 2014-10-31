formsModule
    .directive('formRow', function() {
        return {
            restrict: 'E',
            scope: {
                row: '='
            },
            template: '<form-column ng-repeat="column in row.columns" column="column"/>',
            replace: true,
            controller: 'FormRowController',
            controllerAs: 'ctrl'
        };
    })
    .controller('FormRowController', function() {

    });
