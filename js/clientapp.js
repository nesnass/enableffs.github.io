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

        if(localStorage.lang == undefined) {
            localStorage.lang = 'en';
        }

        $routeProvider.
            when('/search', {
                templateUrl: function() {
                    return '/partials/search.html';
                }
            }).
            when('/:page', {
                templateUrl: function(routeParams) {
                    return '/partials/'+routeParams.page+'_'+localStorage.lang+'.html';
                }
            }).
            when('/:level/:page', {
                templateUrl: function(routeParams) {
                    return '/partials/'+routeParams.level+'/'+routeParams.page+'_'+localStorage.lang+'.html';
                }
            }).
            otherwise({
                redirectTo: '/basic'
            });
    }]);

enableApp.config(['$translateProvider',
    function($translateProvider) {
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage(localStorage.lang);
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