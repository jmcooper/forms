var decimalRegex = /^(\d+\.?\d*|\.\d+)$/;
formsModule.directive('decimal', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.integer = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }

                return decimalRegex.test(viewValue);
            };
        }
    };
});