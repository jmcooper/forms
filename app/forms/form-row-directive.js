formsModule
    .directive('formRow', function() {
        return {
            restrict: 'E',
            scope: {
                row: '=',
                formPageData: '='
            },
            template: '<div class="clearfix"><form-column ng-repeat="column in row.columns" column="column" form-page-data="formPageData"/></div>',
            replace: true,
            controller: 'FormRowController',
            controllerAs: 'formRowController'
        };
    })
    .controller('FormRowController', function() {

    });
