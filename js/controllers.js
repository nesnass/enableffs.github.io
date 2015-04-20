/**
 *
 * @ngdoc controller
 * @name HomeCtrl
 * @description
 * Controller for the default partial: home.html
 *
 */

enableAppControllers.controller("MenuCtrl", function ($scope, $location) {
        console.log('--> menu started');

        $scope.localmode = false;
        $scope.m1 = true;
        $scope.m2 = false;

        //create the global (client) API url based on location object
        options.api.base_url = $location.$$protocol+'://'+$location.$$host+':'+$location.$$port;

        if($location.$$host == 'localhost') {
            $scope.localmode = true;
        }

        $scope.toggle = function(toggleEvent){

            console.log('--> click');
        };
    }
);


enableAppControllers.controller("BasicCtrl", function ($scope, $location, $translate) {
        console.log('--> basic started');

    }
);

enableAppControllers.controller("HomeCtrl", function ($scope, $location, $translate) {

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