formsModule
    .directive('formPage', function() {
        return {
            restrict: 'E',
            scope: {
                formPage: '='
            },
            template: '<form-row ng-repeat="row in formPage.rows" row="row"/>',
            replace: true,
            controller: 'FormPageController',
            controllerAs: 'ctrl'
        };
    })
    .controller('FormPageController', function() {

    });
