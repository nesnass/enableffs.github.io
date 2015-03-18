/**
 * Created by jeremyt on 10/10/14.
 */

var enableApp = angular.module('EnableApp', ['ngRoute', 'pascalprecht.translate', 'EnableAppControllers', 'EnableAppServices', 'EnableAppDirectives']);

var enableAppControllers = angular.module('EnableAppControllers', []);
var enableAppServices = angular.module('EnableAppServices', []);
var enableAppDirectives = angular.module('EnableAppDirectives', []);


var options = {};
options.api = {};

enableApp.config(['$locationProvider', '$routeProvider',
    function($location, $routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/home.html',
                controller: 'HomeCtrl'
            }).
            otherwise({
                redirectTo: '/'
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