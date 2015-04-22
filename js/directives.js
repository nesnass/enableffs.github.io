/**
 * Created by jeremyt on 22/04/15.
 */

enableAppDirectives.directive('myFocus', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.$watch(attr.myFocus, function (n, o) {
                if (n != 0 && n) {
                    element[0].focus();
                }
            });
        }
    };
});