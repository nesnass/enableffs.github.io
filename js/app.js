'use strict';
/**
 * @description
 *
 * This is the angular app definition. It declares its name, as well as injection modules
 *
 */

var enableApp = angular.module('EnableApp', ['ngAria', 'ngRoute', 'ngAnimate', 'pascalprecht.translate', 'angucomplete-alt', 'ngJuxtapose', 'EnableAppUtils', 'EnableAppControllers', 'EnableAppDirectives']);


/**
 *
 * @description
 * Sets the routing for this one page application.
 * The "search" route is hardcoded, whereas the other routes are dynamic
 *
 * Sets the translation engine for this one page application.
 * Language files (in JSON format) are loaded from the languages folder. A language key is common to all language files and is translated based on $translate.use
 * In HTML, translation is obtained by using {{'KEY' | translate}}, where 'KEY' corresponds to a language key defined in the JSON files.
 *
 *
 **/
enableApp.config(['$routeProvider', '$translateProvider', function($routeProvider, $translateProvider) {

        //set english as the default language if another one doesn't exist from the session's localstorage
        if(localStorage.lang === undefined) {
            localStorage.lang = 'en';
        }

        $routeProvider.
            when('/search', {
                templateUrl: function() {
                    return 'content/search.html';
                }
            }).
            when('/home', {
                templateUrl: function() {
                    return 'content/home_' + localStorage.lang + '.html';
                }
            }).
            when('/:page', {
                templateUrl: function(routeParams) {
                    return 'content/'+routeParams.page + '_' + localStorage.lang + '.html';
                }
            }).
            when('/:level/:page', {
                templateUrl: function(routeParams) {
                    return 'content/' + routeParams.level + '/' + routeParams.page + '_' + localStorage.lang+'.html';
                }
            }).
            otherwise({
                redirectTo: 'home'
            });

        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage(localStorage.lang);

}]);

