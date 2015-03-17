enableAppControllers.controller("HomeCtrl", function ($scope, $location) {
        console.log('--> home started');

        //create the global (client) API url based on location object
        options.api.base_url = $location.$$protocol+'://'+$location.$$host+':'+$location.$$port;


    }
);