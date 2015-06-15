/**
 *
 * @ngdoc controller
 * @name MenuCtrl
 * @description
 * Controller for the default page: index.html
 *
 */
enableAppControllers.controller("MenuCtrl", function ($q, $scope, $rootScope, $location, $mdSidenav, $translate, $route, $http) {
        console.log('--> menu started');
        console.log('--> default language: '+localStorage.lang);

        //sets the page title dynamically, which appears either on the current tab, or the current browser window
        $rootScope.roottitle = "Enable portal";

        //Local variables init
        $scope.localmode = false;
        $scope.menuOpen = false;
        $scope.m1 = true;
        $scope.m2 = false;
        $scope.dico = null;
        $scope.selectedItem  = null;
        $scope.searchText    = null;
        $scope.metatags = [];
        $scope.searchEnabled = true;


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

            $mdSidenav('left').open();
            $scope.menuOpen = true;
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

            $mdSidenav('left').close();
            $scope.menuOpen = false;
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
            if(localStorage.lang == lang) {
                return true;
            }
            else {
                return false;
            }
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
            $translate.use(localStorage.lang);
            //force a reload of the current page
            $route.reload();
        };

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
            console.log('--> Item changed to ' + JSON.stringify(item));
            if(item != undefined) {
                //if item, direct the browser to the search page and pass it the item label as a url parameter
                $location.path("/search").search("s", item.display);
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
                $http.get('meta_dictionary.json').
                    success(function (data) {
                        resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        reject(null);
                    });
            });


        };


        initMenuController();
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
            if($location.$$host == 'localhost') {
                $scope.localmode = true;
            }

            var tagsResult;
            $scope.loadSearchTags().then(function(result) {
                tagsResult = result;

                if(tagsResult != null && Object.keys(result).length > 0) {
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

        };
    }
);


/**
 *
 * @ngdoc controller
 * @name SearchCtrl
 * @description
 * Controller for the search page: search.html
 *
 */
enableAppControllers.controller("SearchCtrl", function ($scope, $rootScope, $location, $routeParams) {
        console.log('--> search started with parameter: '+$routeParams.s+' - '+$scope.searchText);

        //sets the page title dynamically, which appears either on the current tab, or the current browser window
        $rootScope.roottitle = "Enable search results";

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
            return path.replace('partials', '#').replace('_en.html', '').replace('_fr.html', '');
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
            return path.replace('partials/', '').replace('_en.html', '').replace('_fr.html', '');
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
            if(lang == localStorage.lang) {
                return true;
            }
            else {
                return false;
            }
        };

    }
);

/**
 *
 * @ngdoc controller
 * @name BasicCtrl
 * @description
 * Controller
 *
 */
enableAppControllers.controller("BasicCtrl", function ($scope, $rootScope, $timeout) {
        console.log('--> basic started');
        var scrollContainer = angular.element(document.getElementById('scrollContainer'));
        $rootScope.roottitle = "Enable basic page";

        /**
         * @ngdoc function
         * @name BasicCtrl.scrolli
         * @kind function
         *
         * @description
         * Function that smooth-scrolls to an element of the page
         *
         * @param {string} elem the ID of the element to scroll to
         */
        $scope.scrolli = function(elem, morevar) {
            /*var element = document.getElementById(elem);
             var options = {
             duration: 1500,
             easing: 'easeInQuad',
             offset: 0,
             callbackBefore: function(element) {
             console.log('about to scroll to element', element);
             },
             callbackAfter: function(element) {
             console.log('scrolled to element', element);
             }
             }
             smoothScroll(element, options);*/

            $scope[morevar] = !$scope[morevar];

            if($scope[morevar] == true) {
                console.log('--> smooth scrolling');
                $timeout(function() {
                    var targetelem = angular.element(document.getElementById(elem));
                    scrollContainer.scrollToElementAnimated(targetelem);
                }, 1000);
            }
            else {
                console.log('--> closing scrolling');
            }


        };


    }
);

/**
 *
 * @ngdoc controller
 * @name HomeCtrl
 * @description
 * Controller
 *
 */
enableAppControllers.controller("HomeCtrl", function ($rootScope) {

        console.log('--> home started');

        $rootScope.roottitle = "Enable home page";
    }
);

/**
 *
 * @ngdoc controller
 * @name AdvCtrl
 * @description
 * Controller
 *
 */
enableAppControllers.controller("AdvCtrl", function ($rootScope) {

        console.log('--> adv started');

        $rootScope.roottitle = "Enable advanced page";
    }
);