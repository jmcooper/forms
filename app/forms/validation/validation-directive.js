'use strict';

formsModule.directive('validation', function ($compile) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (!element[0].form)
                return;

            var formName = element[0].form.name;

            if (attrs.required || attrs.ngRequired) {
                var message = attrs.ngRequiredMessage ? attrs.ngRequiredMessage : 'Required';
                var errorMessageElement = getNewErrorMessageElement()
                    .attr('ng-show', formName + '[\'' + attrs.name + '\'].$error.required && ' + formName + '[\'' + attrs.name + '\'].$dirty')
                    .text(message);
                element.after($compile(errorMessageElement)(scope));
            }
            if (attrs.ngPattern) {
                var errorMessageElement = getNewErrorMessageElement()
                    .attr('ng-show', formName + '[\'' + attrs.name + '\'].$error.pattern && ' + formName + '[\'' + attrs.name + '\'].$dirty')
                    .text(attrs.patternMessage ? attrs.patternMessage : 'Invalid ' + attrs.validation);
                element.after($compile(errorMessageElement)(scope));
            }
            if (attrs.ngMinlength) {
                var errorMessageElement = getNewErrorMessageElement()
                    .attr('ng-show', formName + '[\'' + attrs.name + '\'].$error.minlength && ' + formName + '[\'' + attrs.name + '\'].$dirty')
                    .text(attrs.validation + ' must be at least ' + attrs.ngMinLength + ' characters');
                element.after($compile(errorMessageElement)(scope));
            }
            if (attrs.ngMaxlength) {
                var errorMessageElement = getNewErrorMessageElement()
                    .attr('ng-show', formName + '[\'' + attrs.name + '\'].$error.maxlength')
                    .text(attrs.validation + ' must be no more than ' + attrs.ngMaxlength + ' characters');
                element.after($compile(errorMessageElement)(scope));
            }
            if (attrs.min) {
                var errorMessageElement = getNewErrorMessageElement()
                    .attr('ng-show', formName + '[\'' + attrs.name + '\'].$error.min && ' + formName + '[\'' + attrs.name + '\'].$dirty')
                    .text(attrs.validation + ' must be more than ' + attrs.min);
                element.after($compile(errorMessageElement)(scope));
            }
            if (attrs.max) {
                var errorMessageElement = getNewErrorMessageElement()
                    .attr('ng-show', formName + '[\'' + attrs.name + '\'].$error.max && ' + formName + '[\'' + attrs.name + '\'].$dirty')
                    .text(attrs.validation + ' must be less than ' + attrs.max );
                element.after($compile(errorMessageElement)(scope));
            }
            if (attrs.type==="number") {
                var errorMessageElement = getNewErrorMessageElement()
                    .attr('ng-show', formName + '[\'' + attrs.name + '\'].$error.number && ' + formName + '[\'' + attrs.name + '\'].$dirty')
                    .text(attrs.validation + ' must be a valid number');
                element.after($compile(errorMessageElement)(scope));
            }
            if (attrs.integer === '') {
                var errorMessageElement = getNewErrorMessageElement()
                    .attr('ng-show', formName + '[\'' + attrs.name + '\'].$error.integer && ' + formName + '[\'' + attrs.name + '\'].$dirty')
                    .text(attrs.validation + ' must be a valid integer');
                element.after($compile(errorMessageElement)(scope));
            }
            if (attrs.integer === '') {
                var errorMessageElement = getNewErrorMessageElement()
                    .attr('ng-show', formName + '[\'' + attrs.name + '\'].$error.decimal && ' + formName + '[\'' + attrs.name + '\'].$dirty')
                    .text(attrs.validation + ' must be a valid decimal');
                element.after($compile(errorMessageElement)(scope));
            }
            if (attrs.type==="date") {
                var errorMessageElement = getNewErrorMessageElement()
                    .attr('ng-show', formName + '[\'' + attrs.name + '\'].$error.date && ' + formName + '[\'' + attrs.name + '\'].$dirty')
                    .text(attrs.validation + ' must be a valid date');
                element.after($compile(errorMessageElement)(scope));
            }
            //if (attrs.passwordMatches) {
            //    var passwordMatchMessage = angular.element('<small ng-show="' + formName + '[\'' + attrs.name + '\'].$error[\'password-matches\'] && ' + formName + '[\'' + attrs.name + '\'].$dirty ">Passwords must match</small>');
            //    element.after($compile(passwordMatchMessage)(scope));
            //}

            function getNewErrorMessageElement() {
                return angular.element('<span class="label label-danger"></span>')
            }


        }
    };
});
