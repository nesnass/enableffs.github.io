'use strict';

var enableAppUtils = angular.module('EnableAppUtils', []);

/**
 *
 * @ngdoc service
 * @name EnableAppUtils
 *
 * @description
 * Directive that provides site-wide utility functions
 *
 * @params {$http}
 * @params {$location}
 */
enableAppUtils.factory('EnableAppUtils', ['$http', '$location', function () {

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return {
        getRandomUUID: function () {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
    };

}]);
