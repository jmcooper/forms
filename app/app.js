'use strict';
var formsModule = angular.module('forms', [])
    .config(function($locationProvider) {
       $locationProvider.html5Mode(true);
    });