'use strict';

// Creates a new array, 'L' long filled with 'what'
/*jshint strict: true */
Array.prototype.repeat= function(what, L){
    while(L) {
        this[--L] = what;
        return this;
    }
};

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
