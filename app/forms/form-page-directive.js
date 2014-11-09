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
        var formMetaData = formRepository.get($scope.formId);
        $scope.formPage = formMetaData.pages[0];
        $scope.allFields = _.map(_.flatten(formMetaData.pages[0].rows, 'columns'), 'field')
            .concat(formMetaData.pages[0].hiddenFields);



        $scope.save = function save() {
            console.log($scope.formPageData);
        }
    });
