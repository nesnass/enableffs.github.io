/**
 * Created by jeremyt on 22/04/15.
 */

enableAppDirectives.directive('focusMe', function() {
    return function(scope, element, attrs) {
        element.attr("tabIndex", -1).focus();
    };
});