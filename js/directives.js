/**
 * Created by jeremyt on 22/04/15.
 */

enableAppDirectives.directive('autoActive', ['$location', function ($location) {
    return {
        restrict: 'A',
        scope: false,
        link: function (scope, element) {
            function setActive() {
                var path = $location.path();
                if (path) {
                    angular.forEach(element.find('a'), function (a) {
                        if (a.href.match('#' + path + '(?=\\?|$)')) {
                            angular.element(a).addClass('sidenavlinksactive');
                        } else {
                            angular.element(a).removeClass('sidenavlinksactive');
                        }
                    });
                }
            }

            setActive();

            scope.$on('$locationChangeSuccess', setActive);
        }
    }
}]);


enableAppDirectives.directive('enableYoutube', function($sce) {
    return {
        scope:{
            vidid: '@',
            cclang: '@'
        },
        restrict: 'AE',
        replace: 'true',
        template: '<div id="youtubevideo">' +
                    '<h2>{{header}}</h2>' +
                    '<span class="screenReadersOnly">{{blindMessage}}</span>' +
                    '<div class="videoWrapper">' +
                    '<iframe aria-label="Youtube video iframe" width="640" height="360" src="{{vidurl}}" frameborder="0" allowfullscreen></iframe></div></div>',
        link: function(scope) {
            scope.vidurl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/"+scope.vidid+"?html5=1&controls=1&autohide=0&rel=0&showinfo=0&hl="+scope.cclang+"&cc_load_policy=1");

            switch(cclang) {
                case 'en':
                    scope.header = "Video loaded from youtube";
                    scope.blindMessage = "For a fully keyboard-accessible alternative to this video, view it in Chrome or on any Android or iOS device, view it in Firefox with the YouTube ALL HTML5 add-on installed, or disable Flash in Internet Explorer.";
                    break;
                case 'fr':
                    scope.header = "Video loaded from youtube";
                    scope.blindMessage = "Pour une alternative entièrement accéssible au clavier, charger la page avec Chrome ou avec m'importe quel appareil Android ou iOS, avec Firefox et le ALL HTML5 module installé, ou bien en annulant Flash sous Internet Explorer.";
                    break;

            }
        }
    };
});