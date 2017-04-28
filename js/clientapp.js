'use strict';
/**
 * @description
 *
 * This is the angular app definition. It declares its name, as well as injection modules
 *
 */

var enableApp = angular.module('EnableApp', ['ngAria', 'ngRoute', 'ngAnimate', 'pascalprecht.translate', 'angucomplete-alt', 'EnableAppUtils', 'EnableAppControllers', 'EnableAppDirectives']);


/**
 *
 * @description
 * Sets the routing for this one page application.
 * The "search" route is hardcoded, whereas the other routes are dynamic
 *
 **/
enableApp.config(['$routeProvider', function($routeProvider) {

        //set english as the default language if another one doesn't exist from the session's localstorage
        if(localStorage.lang === undefined) {
            localStorage.lang = 'en';
        }

        $routeProvider.
            when('/search', {
                templateUrl: function() {
                    return 'partials/templates/search.html';
                }
            }).
            when('/home', {
                templateUrl: function() {
                    return 'partials/templates/home_'+localStorage.lang+'.html';
                }
            }).
            when('/:page', {
                templateUrl: function(routeParams) {
                    return 'partials/'+routeParams.page+'_'+localStorage.lang+'.html';
                }
            }).
            when('/:level/:page', {
                templateUrl: function(routeParams) {
                    return 'partials/'+routeParams.level+'/'+routeParams.page+'_'+localStorage.lang+'.html';
                }
            }).
            otherwise({
                redirectTo: 'home'
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
enableApp.config(['$translateProvider', function($translateProvider) {

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
 * Manages the focus when a link is selected from the sidebar menu. This focuses on the header of the newly loaded page.
 * This is essentially to help accessibility
 *
 **/
enableApp.run(['$rootScope', function($rootScope) {

    //when the view is finished loaded, focus on the top
    $rootScope.$on('$viewContentLoaded', function () {
        var myEl = angular.element( document.querySelector( '#scrollContainer' ) );
        myEl.scrollTop = 0;
        myEl[0].focus();
    });
}]);