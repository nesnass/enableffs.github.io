'use strict';

var enableAppControllers = angular.module('EnableAppControllers', []);

/**
 *
 * @ngdoc controller
 * @name MenuCtrl
 * @description
 * Controller for the default page: index.html
 *
 */
enableAppControllers.controller("MainCtrl", ['$q', '$scope', '$window', '$rootScope', '$location', '$translate', '$route', '$http', '$routeParams', function ($q, $scope, $window, $rootScope, $location, $translate, $route, $http, $routeParams) {
        console.log('--> menu started');
        console.log('--> default language: ' + localStorage.lang);

        //sets the page title dynamically, which appears either on the current tab, or the current browser window
        $rootScope.roottitle = "Enable portal";

        //Local variables init
        $scope.localmode = false;
        $scope.menuOpen = false;
        $scope.dico = null;
        $scope.selectedItem  = null;
        $scope.searchText    = null;
        $scope.metatags = [];
        $scope.searchEnabled = true;
        $scope.windowWidth = 100;
        $scope.menuInclude = '';

        $scope.customFontSize = 'defaultFontSize';
        $scope.fontSizeIconPath = 'img/font-size-up.png';

        $scope.showVision = false;
        $scope.showHearing = false;
        $scope.showDual = false;
        $scope.showSensory = false;
        $scope.showHamburger = false;
        $scope.showHomeButton = false;

        angular.element($window).bind('resize', function () {
            $scope.windowWidth = $window.innerWidth;
            $scope.menuOpen = false;
            $scope.showHamburger = $scope.windowWidth < 600;
            $scope.$apply();
        });

        //when the view is finished loaded, focus on the top
        $rootScope.$on('$viewContentLoaded', function () {
            var myEl = angular.element( document.querySelector( '#scrollContainer' ) );
            myEl.scrollTop = 0;
            myEl[0].focus();

            if ($scope.menuInclude === '' && $routeParams.hasOwnProperty('level') && $routeParams.hasOwnProperty('page')) {
	            var currentLevel = $routeParams['level'];
	            var currentPage = $routeParams['page'];
                $scope.goToSection(currentLevel, currentLevel + '/' + currentPage);
            }

        });

        $scope.goToSection = function(category, path) {
            //controls which menu template is included in the sidenav
            $scope.showVision = false;
            $scope.showHearing = false;
            $scope.showDual = false;
            $scope.showSensory = false;
            $scope.showHomeButton = true;

            switch(category) {
                case 'home':
                    //  $scope.showHamburger = false;
                    $scope.showHomeButton = false;
                    $scope.menuInclude = '';
                    $rootScope.roottitle = "Enable home page";
                    break;
                case 'search':
                    //  $scope.showHamburger = false;
	                $scope.showHomeButton = true;
	                $rootScope.roottitle = "Enable search results";
                    break;
                case 'vision':
                    //   $scope.showHamburger = true;
                    $scope.showVision = true;
                    $scope.menuInclude = 'vision';
                    $rootScope.roottitle = "Enable. Vision";
                    break;
                case 'hearing':
                    //   $scope.showHamburger = true;
                    $scope.showHearing = true;
                    $scope.menuInclude = 'hearing';
                    $rootScope.roottitle = "Enable. Hearing";
                    break;
                case 'dual':
                    //  $scope.showHamburger = true;
                    $scope.showDual = true;
                    $scope.menuInclude = 'dual';
                    $rootScope.roottitle = "Enable. Dual impairment";
                    break;
                case 'sensory':
                    //  $scope.showHamburger = true;
                    $scope.showSensory = true;
                    $scope.menuInclude = 'sensory';
                    $rootScope.roottitle = "Enable. Sensory impairment";
                    break;
            }
            $location.path(path);
        };

        /**
         * @ngdoc function
         * @name MenuCtrl.openMenu
         * @kind function
         *
         * @description
         * Opens the left sidebar menu
         *
         */
        $scope.openMenu = function() {
            $scope.menuOpen = true;
        };

        $scope.resizePageFont = function() {
            if ($scope.customFontSize === 'defaultFontSize') {
	            $scope.fontSizeIconPath = 'img/font-size-up.png';
                $scope.customFontSize = 'mediumFontSize';
            } else if ($scope.customFontSize === 'mediumFontSize') {
	            $scope.fontSizeIconPath = 'img/font-size-down.png';
	            $scope.customFontSize = 'largeFontSize';
            } else {
	            $scope.fontSizeIconPath = 'img/font-size-up.png';
	            $scope.customFontSize = 'defaultFontSize';
            }
        };

        /**
         * @ngdoc function
         * @name MenuCtrl.closeMenu
         * @kind function
         *
         * @description
         * Closes the left sidebar menu
         *
         */
        $scope.closeMenu = function() {
            $scope.menuOpen = false;
            if ($scope.windowWidth < 600) {
                $scope.showHamburger = true;
            }
        };

        /**
         * @ngdoc function
         * @name MenuCtrl.getLangButtonState
         * @kind function
         *
         * @description
         * Returns true if the current language matches the passed param, if not returns false
         *
         * @param {string} lang i.e. 'en', 'fr, etc
         */
        $scope.getLangButtonState = function(lang) {
            return localStorage.lang === lang;
        };

        /**
         * @ngdoc function
         * @name MenuCtrl.setLang
         * @kind function
         *
         * @description
         * Changes the applications language based on the language code sent
         *
         * @param {string} lang i.e. 'en', 'fr, etc
         */
        $scope.setLang = function(lang) {
            //update the localstorage value (in case of a page reload)
            localStorage.lang = lang;
            //update the translation module with the new value
            $translate.use(lang);
            //force a reload of the current page
            $route.reload();
        };

        /**
         * @ngdoc function
         * @name MenuCtrl.createFilterFor
         * @kind function
         *
         * @description
         * Function that returns a boolean, based on the filtering string and the array where the filter is applied to.
         *
         * @param {string} query the query string which is passed
         *
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(tag) {
                return (tag.value.indexOf(lowercaseQuery) === 0);
            };
        }

        /**
         * @ngdoc function
         * @name MenuCtrl.querySearch
         * @kind function
         *
         * @description
         * Function called when a change (typing) is noticed by the md-autocomplete search input. Returns an array of results matching the query
         *
         * @param {string} query the query string which is currently being typed in the search input
         */
        $scope.querySearch = function(query) {
            var results = query ? $scope.metatags.filter( createFilterFor(query) ) : [];
            return results;

        };

        /**
         * @ngdoc function
         * @name MenuCtrl.selectedItemChange
         * @kind function
         *
         * @description
         * Function called when an item is selected (clicked) on the md-autocomplete search input match list
         *
         * @param {object} item the selected list item
         */
        $scope.selectedItemChange = function(item) {
            console.log('--> Item changed to ' + JSON.stringify(item.description.value));
            if(item !== undefined) {
                //if item, direct the browser to the search page and pass it the item label as a url parameter
	            $scope.closeMenu();
	            $scope.showHomeButton = true;
	            $location.path("/search").search("s", item.description.value);
            }
        };

        /**
         * @ngdoc function
         * @name MenuCtrl.loadSearchTags
         * @kind function
         *
         * @description
         * Function that returns the loaded tags dictionary to enable site search
         *
         */
        $scope.loadSearchTags = function() {
            //loads the JSON formatted search dictionary
            return $q(function(resolve, reject) {
                $http.get('freetext_dictionary.json').
                success(function (data) {
                    resolve(data);
                }, function(error) {
                    reject(error);
                });
            });


        };



        /**
         * @ngdoc function
         * @name SensoryCtrl.gotoAnchor
         * @kind function
         *
         * @description
         * Function that redirects the browser to the provided path
         *
         * @param {string} newHash the anchor path to redirect to
         */
        $scope.gotoAnchor = function(newHash) {

            if ($location.hash() !== newHash) {
                // set the $location.hash to `newHash` and
                // $anchorScroll will automatically scroll to it
                $location.hash(newHash);
            } else {
                // call $anchorScroll() explicitly,
                // since $location.hash hasn't changed
                $anchorScroll();
            }
        };

        /**
         * @ngdoc function
         * @name MenuCtrl.initMenuController
         * @kind function
         *
         * @description
         * Function called when controller is loaded
         *
         */
        function initMenuController() {
            //checks whether online or offline mode
            if($location.$$host === 'localhost') {
                $scope.localmode = true;
            }

            $scope.windowWidth = $window.innerWidth;
            if ($scope.windowWidth < 600) {
                $scope.menuOpen = false;
                $scope.showHamburger = true;
            }

            $scope.showHomeButton = $location.path() !== '/home';

            console.log('--> running in localmode: '+$scope.localmode);

            var tagsResult;
            $scope.loadSearchTags().then(function(result) {
                tagsResult = result;

                if(tagsResult !== null && Object.keys(result).length > 0) {
                    //upon success, keeps the result as a dictionary variable
                    $scope.dico    = tagsResult;
                    //builds a comma seperated string of the dictionary keys, to be used by the md-autocomplete component
                    $scope.metatagstring = (Object.keys($scope.dico));

                    //builds a map of keys and values for the search
                    $scope.metatags = $scope.metatagstring.map(function(tag) {
                        return {
                            value: tag.toLowerCase(),
                            display: tag
                        };
                    });
                }
                else {
                    //if the tag loading failed or dictionary is empty, hide the search element
                    $scope.searchEnabled = false;
                }
            });

            //simple URL path test to reopen expanded menu items when page reload
            var pagePath = $location.$$path;
            if(pagePath.indexOf('s01') > -1) {
                $scope.m1 = true;
            }
            else if(pagePath.indexOf('s02') > -1) {
                $scope.m2 = true;
            }
            else if(pagePath.indexOf('s03') > -1) {
                $scope.m3 = true;
            }
            else if(pagePath.indexOf('s04') > -1) {
                $scope.m4 = true;
            }
            else if(pagePath.indexOf('s05') > -1) {
                $scope.m5 = true;
            }
            else if(pagePath.indexOf('s06') > -1) {
                $scope.m6 = true;
            }
            else if(pagePath.indexOf('s07') > -1) {
                $scope.m7 = true;
            }
            else if(pagePath.indexOf('s08') > -1) {
                $scope.m8 = true;
            }
            else if(pagePath.indexOf('s09') > -1) {
                $scope.m9 = true;
            }
            else if(pagePath.indexOf('s10') > -1) {
                $scope.m10 = true;
            }
            else if(pagePath.indexOf('s11') > -1) {
                $scope.m11 = true;
            }
            else if(pagePath.indexOf('s12') > -1) {
                $scope.m12 = true;
            }
            else if(pagePath.indexOf('s13') > -1) {
                $scope.m13 = true;
            }
            else if(pagePath.indexOf('s14') > -1) {
                $scope.m14 = true;
            }
            else if(pagePath.indexOf('s15') > -1) {
                $scope.m15 = true;
            }
        }
        initMenuController();
    }]
);



/**
 *
 * @ngdoc controller
 * @name SearchCtrl
 * @description
 * Controller for the search page: search.html
 *
 */
enableAppControllers.controller("SearchCtrl", ['$scope', '$rootScope', '$location', '$routeParams', function ($scope, $rootScope, $location, $routeParams) {
        console.log('--> search started with parameter: '+$routeParams.s+' - '+$scope.searchText);

        $scope.$emit('pageNavigationEvent', 'search');

        //sets the page title dynamically, which appears either on the current tab, or the current browser window


        //Retrieve the search string and the results
        $scope.searchResultForText = $routeParams.s;
        $scope.searchResults = $scope.dico[$scope.searchResultForText];

        /**
         * @ngdoc function
         * @name SearchCtrl.getFormattedUrl
         * @kind function
         *
         * @description
         * Function that formats the url of the link for a search result item
         *
         * @param {string} path the path to the result item
         */
        $scope.getFormattedUrl = function(path) {
            return path.replace('content', '#').replace('_en.html', '').replace('_fr.html', '');
        };

        /**
         * @ngdoc function
         * @name SearchCtrl.getFormattedLink
         * @kind function
         *
         * @description
         * Function that formats the text of the link for a search result item
         *
         * @param {string} path the path to the result item
         */
        $scope.getFormattedLink = function(path) {
            return path.replace('content/', '').replace('_en.html', '').replace('_fr.html', '');
        };

        /**
         * @ngdoc function
         * @name SearchCtrl.checkLinkFitsLanguage
         * @kind function
         *
         * @description
         * Function that filters the link to only show it if it correspond to the set language
         *
         * @param {string} path the path to the result item
         */
        $scope.checkLinkFitsLanguage = function(path) {
            var lang = path.substring(path.length-7, path.length-5);
            if(lang === localStorage.lang) {
                return true;
            }
            else {
                return false;
            }
        };

    }]
);





/**
 *
 * @ngdoc controller
 * @name AdvCtrl
 * @description
 * Controller
 *
 */
enableAppControllers.controller("AdvCtrl", ['$rootScope', function ($rootScope) {

        console.log('--> adv started');

        $rootScope.roottitle = "Enable advanced page";
    }]
);