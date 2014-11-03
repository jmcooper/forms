formsModule.filter('parseFloat', function() {
    return function(stringVal) {
        return parseFloat(stringVal);
    }
});