var integerRegex = /^\-?\d+$/;
formsModule.directive('integer', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.integer = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }

                return integerRegex.test(viewValue);
            };
        }
    };
});