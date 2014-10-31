'use strict';
var formsModule = angular.module('forms', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider.when('', { templateUrl: ''});

        $locationProvider.html5Mode(true);
    });
