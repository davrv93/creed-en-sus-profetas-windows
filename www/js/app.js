// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('starter', ['ionic-toast', 'ngResource', // inject the Ionic framework
        'pascalprecht.translate', 'ui.router', 'ngAria', 'ngServices',
        'ngMdIcons', 'ngModal', 'ngMaterial', 'ngAnimate','ngSanitize',
        'angular-clipboard'
    ])

    .run(function($rootScope, $http) {

    })

    .config(function($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.useXDomain = true;
    })

    .config(function($mdThemingProvider) {

        var whiteMap = $mdThemingProvider.extendPalette('grey', { '500': '#ffffff', 'contrastDefaultColor': 'dark' });
        $mdThemingProvider.definePalette('white', whiteMap);
    })

    .config(function($httpProvider) {
        $httpProvider.useApplyAsync(true);
    })