/**
 * Created by jeremyt on 10/10/14.
 */

var enableApp = angular.module('EnableApp', ['ngRoute', 'pascalprecht.translate', 'EnableAppControllers', 'EnableAppServices', 'EnableAppDirectives']);

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
                redirectTo: '/home'
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