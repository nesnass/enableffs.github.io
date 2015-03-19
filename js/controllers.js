/**
 * @ngdoc controller
 * @name HomeCtrl
 * @description
 * Controller for the default partial: home.html
 */

enableAppControllers.controller("HomeCtrl", function ($scope, $location, $translate) {
        console.log('--> home started');

        $scope.localmode = false;

        //create the global (client) API url based on location object
        options.api.base_url = $location.$$protocol+'://'+$location.$$host+':'+$location.$$port;

        if($location.$$host == 'localhost') {
            $scope.localmode = true;
        }


        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };
    }
);