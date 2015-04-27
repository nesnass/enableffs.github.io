/**
 * @description
 *
 * This is the angular app definition. It declares its name, as well as injection modules
 *
 */

var enableApp = angular.module('EnableApp', ['ngAria', 'ngRoute', 'ngAnimate', 'ngMaterial', 'pascalprecht.translate', 'EnableAppControllers', 'EnableAppServices', 'EnableAppDirectives', 'ngSanitize', 'com.2fdevs.videogular', 'com.2fdevs.videogular.plugins.controls']);

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

enableApp.config(['$mdThemingProvider',
    function($mdThemingProvider) {
        $mdThemingProvider.theme('default').primaryPalette('light-green');
    }]);


enableApp.run(['$location', '$rootScope', function($location, $rootScope) {

    var history; // stores uri of last page viewed - Used to track if we should set focus to main H1
    var currentURL; // store uri of current page viewed - Used to track if we should set focus to main H1


    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        // test for current route
        if(current.params) {
            // store current path
            currentURL = current.params.page;

            // Set current page title
            switch(currentURL) {
                case 'home':
                    $rootScope.title = 'Page with video';
                    break;

                default:
                    $rootScope.title = 'Page with header';
            }



        }
    });

    $rootScope.$on('$viewContentLoaded', function () {

        var myEl = angular.element( document.querySelector( '#focusHeader' ) );
        myEl.focus();

    });
}]);