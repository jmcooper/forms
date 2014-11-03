formsModule.filter('parseDate', function() {
    return function(stringVal) {
        return Date.parse(stringVal);
    }
});