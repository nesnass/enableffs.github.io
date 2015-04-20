/**
 * @description
 *
 * This is the angular app definition. It declares its name, as well as injection modules
 *
 */

var enableApp = angular.module('EnableApp', ['ngAria', 'ngRoute', 'ngAnimate', 'ngMaterial', 'pascalprecht.translate', 'EnableAppControllers', 'EnableAppServices', 'EnableAppDirectives']);

var enableAppControllers = angular.module('EnableAppControllers', []);
var enableAppServices = angular.module('EnableAppServices', []);
var enableAppDirectives = angular.module('EnableAppDirectives', []);


var options = {};
options.api = {};

enableApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/:page', {
                templateUrl: function(routeParams) {
                    return '/partials/'+routeParams.page+'.html';
                }
            }).
            when('/:level/:page', {
                templateUrl: function(routeParams) {
                    return '/partials/'+routeParams.level+'/'+routeParams.page+'.html';
                }
            }).
            otherwise({
                redirectTo: '/basic'
            });
    }]);

enableApp.config(['$translateProvider',
    function($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
    }]);