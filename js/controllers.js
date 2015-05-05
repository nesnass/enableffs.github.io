/**
 *
 * @ngdoc controller
 * @name HomeCtrl
 * @description
 * Controller for the default partial: home.html
 *
 */

enableAppControllers.controller("MenuCtrl", function ($scope, $location, $mdSidenav, $translate, $route) {
        console.log('--> menu started');
        console.log('--> default language: '+localStorage.lang);

        $scope.localmode = false;
        $scope.menuOpen = false;
        $scope.m1 = true;
        $scope.m2 = false;

        //create the global (client) API url based on location object
        options.api.base_url = $location.$$protocol+'://'+$location.$$host+':'+$location.$$port;

        if($location.$$host == 'localhost') {
            $scope.localmode = true;
        }

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