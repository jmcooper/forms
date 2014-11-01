formsModule
    .directive('formPage', function() {
        return {
            restrict: 'E',
            scope: {
                formId: '=',
                orderId: '='
            },
            templateUrl: 'forms/form-page.html',
            replace: true,
            controller: 'FormPageController',
            controllerAs: 'formPageController'
        };
    })
    .controller('FormPageController', function($scope, formRepository) {
        $scope.formPageData = {};
        $scope.formPage = formRepository.get($scope.formId).pages[0];

        $scope.save = function save() {
            console.log($scope.formPageData);
        }
    });
