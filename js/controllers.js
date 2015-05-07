/**
 *
 * @ngdoc controller
 * @name HomeCtrl
 * @description
 * Controller for the default partial: home.html
 *
 */

enableAppControllers.controller("MenuCtrl", function ($scope, $location, $mdSidenav, $translate, $route, $http) {
        console.log('--> menu started');
        console.log('--> default language: '+localStorage.lang);

        $scope.localmode = false;
        $scope.menuOpen = false;
        $scope.m1 = true;
        $scope.m2 = false;

        $scope.dico = null;

        $scope.selectedItem  = null;
        $scope.searchText    = null;
        $scope.metatags = [];


        $scope.openMenu = function() {

            $mdSidenav('left').open();
            $scope.menuOpen = true;
        };

        $scope.closeMenu = function() {

            $mdSidenav('left').close();
            $scope.menuOpen = false;
        };

        $scope.getLangButtonState = function(lang) {
            if(localStorage.lang == lang) {
                return true;
            }
            else {
                return false;
            }
        };

        $scope.setLang = function(lang) {
            localStorage.lang = lang;
            $translate.use(localStorage.lang);
            $route.reload();
        };

        $scope.querySearch = function(query) {
            var results = query ? $scope.metatags.filter( createFilterFor(query) ) : [];
            return results;

        };

        $scope.searchTextChange = function(text) {
            console.log('--> Text changed to ' + text);
        };

        $scope.selectedItemChange = function(item) {
            console.log('--> Item changed to ' + JSON.stringify(item));
            if(item != undefined) {
                $location.path("/search").search("s", item.display);
            }
        };

        initMenuController();
        function initMenuController() {
            //create the global (client) API url based on location object
            options.api.base_url = $location.$$protocol+'://'+$location.$$host+':'+$location.$$port;

            if($location.$$host == 'localhost') {
                $scope.localmode = true;
            }

            $http.get('meta_dictionary.json').success(function(data) {
                $scope.dico    = data;
                $scope.metatagstring = (Object.keys($scope.dico));

                $scope.metatags = $scope.metatagstring.map(function(tag) {
                    return {
                        value: tag.toLowerCase(),
                        display: tag
                    };
                });
            });
        };

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(tag) {
                return (tag.value.indexOf(lowercaseQuery) === 0);
            };
        };


    }
);


enableAppControllers.controller("SearchCtrl", function ($scope, $location, $routeParams) {

        console.log('--> search started with parameter: '+$routeParams.s+' - '+$scope.searchText);

        $scope.searchResults = $scope.dico[$scope.searchText];

        $scope.getFormattedUrl = function(path) {
            return path.replace('partials', '#').replace('_en.html', '').replace('_fr.html', '');
        }

        $scope.getFormattedLink = function(path) {
            return path.replace('partials/', '').replace('_en.html', ' [EN]').replace('_fr.html', ' [FR]');
        }

    }
);


enableAppControllers.controller("BasicCtrl", function ($scope, $location) {
        console.log('--> basic started');



    }
);

enableAppControllers.controller("HomeCtrl", function ($scope, $location) {

        console.log('--> home started');


        /**
         * @ngdoc function
         * @name HomeCtrl.changeLanguage
         * @kind function
         *
         * @description
         * Sets the locale to use by the module angular-translate
         *          *
         * @param {String} langKey local name, i.e. 'en', 'fr, etc
         *
         */

    }
);

enableAppControllers.controller("AdvCtrl", function () {

        console.log('--> adv started');


    }
);