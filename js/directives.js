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
        templateUrl: 'partials/templates/video-youtube-template.html',
        link: function(scope) {
            scope.vidurl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/"+scope.vidid+"?html5=1&controls=1&autohide=0&rel=0&showinfo=0&hl="+scope.cclang+"&cc_load_policy=1");

        }
    };
});


enableAppDirectives.directive('enableVideo', function($sce) {
    return {
        scope:{
            vidid: '@',
            cclang: '@'
        },
        restrict: 'AE',
        replace: 'true',
        templateUrl: 'partials/templates/video-local-template.html',
        link: function(scope) {
            scope.vidurl = $sce.trustAsResourceUrl("assets/vids/"+scope.vidid+".mp4");
            scope.vidtrack = $sce.trustAsResourceUrl("assets/vids/"+scope.vidid+"_"+scope.cclang+".srt");

        }
    };
});

enableAppDirectives.directive('enableSlideshow', function($http) {
    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: 'partials/templates/slideshow-template.html',
        link: function(scope, elem, attrs) {
            scope.currentIndex = 0; // Initially the index is at the first image
            scope.images = [];

            $http.get(attrs.path+'/init.json').then(function(res) {
                res.data.forEach(function (slide) {
                    slide.src = attrs.path+"/"+slide.src;
                    scope.images.push(slide);
                });
                console.log('--> json loaded');

                scope.$watch('currentIndex', function() {
                    scope.images.forEach(function(image) {
                        image.visible = false; // make every image invisible
                    });

                    scope.images[scope.currentIndex].visible = true; // make the current image visible
                });
            });


            scope.next = function() {
                scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
            };

            scope.prev = function() {
                scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
            };

        }
    };
});