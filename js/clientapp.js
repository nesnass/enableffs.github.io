/**
 * @description
 *
 * This is the angular app definition. It declares its name, as well as injection modules
 *
 */

var enableApp = angular.module('EnableApp', ['ngAria', 'ngRoute', 'ngAnimate', 'ngMaterial', 'pascalprecht.translate', 'EnableAppControllers', 'EnableAppDirectives', 'duScroll']);

var enableAppControllers = angular.module('EnableAppControllers', []);
var enableAppDirectives = angular.module('EnableAppDirectives', []);

enableApp.value('duScrollDuration', 1000);

/**
 *
 * @description
 * Sets the routing for this one page application.
 * The "search" route is hardcoded, whereas the other routes are dynamic
 *
 **/
enableApp.config(['$routeProvider', function($routeProvider) {

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
                redirectTo: '/home'
            });
    }]);

/**
 *
 * @description
 * Sets the translation engine for this one page application.
 * Language files (in JSON format) are loaded from the languages folder. A language key is common to all language files and is translated based on $translate.use
 * In HTML, translation is obtained by using {{'KEY' | translate}}, where 'KEY' corresponds to a language key defined in the JSON files.
 *
 **/
enableApp.config(['$translateProvider',
    function($translateProvider) {
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage(localStorage.lang);
    }]);

/**
 *
 * @description
 * Sets the default theme for this one page application.
 * The color palette defined will affect all google-material components, i.e. toolbars, buttons, etc
 *
 **/
enableApp.config(['$mdThemingProvider',
    function($mdThemingProvider) {
        $mdThemingProvider.theme('default').primaryPalette('amber');
    }]);

/**
 *
 * @description
 * Manages the focus when a link is selected from the sidebar menu. This focuses on the header of the newly loaded page.
 * This is essentially to help accessibility
 *
 **/
enableApp.run(['$location', '$rootScope', function($location, $rootScope) {

    /*$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        // test for current route
        if(current.params) {
            // store current path
            currentURL = current.params.page;
            $rootScope.ishome = false;
            // Set current page title
            switch(currentURL) {
                case 'home':
                    $rootScope.ishome = true;
                    break;
            }
        }
    });*/

    $rootScope.$on('$viewContentLoaded', function () {

        var myEl = angular.element( document.querySelector( '#scrollContainer' ) );
        myEl.focus();

    });
}]);