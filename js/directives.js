/**
 *
 * @ngdoc directive
 * @name autoActive
 * @scope false
 * @restrict A
 * @description
 * Directive that appends a class to the current element, based on whether it matches the current route
 *
 */
enableAppDirectives.directive('autoActive', ['$location', function ($location) {
    return {
        restrict: 'A',
        scope: false,
        link: function (scope, element) {

            /**
             * @ngdoc function
             * @name autoActive.setActive
             * @kind function
             *
             * @description
             * Function that analyses the current route path versus the a link target.
             * If it matches it adds the class 'sidenavlinksactive', if not it removes it
             */
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

/**
 *
 * @ngdoc directive
 * @name enableYoutube
 * @scope true
 * @restrict AE
 * @param {string} vidid The id of the youtube video file.
 * @param {string} cclang The current language code. This will load the subtitles in the current portal language.
 * @description
 * Directive that creates a embedded youtube player with the video id provided and the language for the subtitles.
 *
 */
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

/**
 *
 * @ngdoc directive
 * @name enableVideo
 * @scope true
 * @restrict AE
 * @param {string} vidid The id of the local video file. This id will be used for the poster image and the subtitles
 * @param {string} cclang The current language code. This will load the subtitles in the current portal language.
 * @description
 * Directive that creates a local video player with the video id provided and the language for the subtitles.
 *
 */
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

/**
 *
 * @ngdoc directive
 * @name enableSlideshow
 * @scope true
 * @restrict E
 * @param {string} path Path to the directory where the slideshow is defined. The directive expects a JSON file called 'init.json' with an array of images and texts
 * @description
 * Directive loads a JSON config file for a slideshow based on the provided path.
 * The template then loads the pictures and texts specified in that config file and creates a self-contained slideshow
 *
 */
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
                    slide.text = slide["text_"+localStorage.lang];
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