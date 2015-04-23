/**
 *
 * @ngdoc controller
 * @name HomeCtrl
 * @description
 * Controller for the default partial: home.html
 *
 */

enableAppControllers.controller("MenuCtrl", function ($scope, $location, $mdSidenav) {
        console.log('--> menu started');

        $scope.localmode = false;
        $scope.m1 = true;
        $scope.m2 = false;

        //create the global (client) API url based on location object
        options.api.base_url = $location.$$protocol+'://'+$location.$$host+':'+$location.$$port;

        if($location.$$host == 'localhost') {
            $scope.localmode = true;
        }

        $scope.openMenu = function() {

            $mdSidenav('left').open();
        };

        $scope.focusSection = function() {
            $mdSidenav('left').close();


        };
    }
);


enableAppControllers.controller("BasicCtrl", function ($scope, $location, $translate) {
        console.log('--> basic started');



    }
);

enableAppControllers.controller("HomeCtrl", function ($scope, $location, $translate) {

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
        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };
    }
);