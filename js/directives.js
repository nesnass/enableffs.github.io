'use strict';

var enableAppDirectives = angular.module('EnableAppDirectives', []);

/**
 *
 * @ngdoc directive
 * @name autoActive
 * @scope false
 * @restrict A
 * @element a
 * @description
 * Directive that appends a class to the current element, based on whether it matches the current route
 *
 */
enableAppDirectives.directive('autoActive', ['$location', '$timeout', function ($location, $timeout) {
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

                if (element[0].href.match(path + '(?=\\?|$)')) {
                    element.addClass('sidenavlinksactive');
                } else {
                    element.removeClass('sidenavlinksactive');
                }


            }

            //initiate after 500msec to make sure that element is built
            $timeout(function() {
                setActive();
            }, 500);

            scope.$on('$locationChangeSuccess', setActive);
        }
    };
}]);


/**
 *
 * @ngdoc directive
 * @name enableSectionHeader
 * @scope true
 * @restrict E
 * @param {string} picpath The path of the background image for the section header.
 * @param {string} picalt The alternative text for the header image, to be read by screenreaders.
 * @param {string} title The title of the section
 * @description
 * Directive that places a section header with a background picture, it alt text and the section title
 *
 */
enableAppDirectives.directive('enableSectionHeader', ['$sce','$route', function($sce, $route) {
    return {
        scope:{
            picpath: '@',
            picalt: '@',
            title: '@'
        },
        restrict: 'E',
        replace: 'true',
        templateUrl: 'partials/templates/enable-section-header-template.html',

        link: function(scope) {
            scope.picsrc = $sce.trustAsResourceUrl('partials/'+$route.current.params.level+'/media/pics/'+scope.picpath);
        }
    };
}]);

/**
 *
 * @ngdoc directive
 * @name enableVideo
 * @scope true
 * @restrict AE
 * @param {string} youtubeId The id of the youtube video. This will bring up the youtube video player , as well as the CC attached to that video
 * @param {string} localFilename The id (file name) of the local video file. This id will be used for the poster image and the subtitles
 * @param {string} cclang The current language code. This will load the subtitles in the current portal language.
 * @param {boolean} localmode The mode that needs to be inserted in the page, true => local videos, false => youtube videos
 * @description
 *
 * Example: <enable-video local-filename="xyz.mp4" local-poster="xyz.jpg" local-subtitles="xyz.srt" youtube-id="abcdefg"></enable-video>
 *
 *  video should be in .mp4 format
 *  subtitles should be in .srt format
 *  poster should be in .jpg format
 *
 * Directive that creates a local video player based on the localmode paramter with the video id provided and the language for the subtitles.
 *
 */
enableAppDirectives.directive('enableVideo', ['$sce','$route', '$translate', function($sce, $route, $translate) {

    return {
	    scope: {
		    localPoster: '@',
		    localFilename: '@',
		    localSubtitles: '@',
            youtubeId: '@'
	    },
	    restrict: 'AE',
	    replace: 'true',
	    templateUrl: 'partials/templates/enable-video-template.html',

	    controller: function ($scope) {
		    $scope.currentLanguage = $translate.use();
		    $scope.localmode = false;

		    if ($scope.$parent.localmode) {

                $scope.localmode = true;
			    $scope.vidtrack = '';
			    if ($scope.localSubtitles !== '') {
				    $scope.vidsubtitles = $sce.trustAsResourceUrl('partials/' + $route.current.params.level + '/media/vids/' + $scope.localSubtitles);
			    }
			    if ($scope.localPoster !== '') {
				    $scope.poster = 'partials/' + $route.current.params.level + '/media/pics/' + $scope.localPoster;
			    }
			    var videoUrl = 'partials/' + $route.current.params.level + '/media/vids/' + $scope.localFilename;
			    $scope.vidurl = $sce.trustAsResourceUrl(videoUrl);
		    }
		    else {
			    $scope.vidurl = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + $scope.youtubeId + "?html5=1&controls=1&autohide=0&rel=0&showinfo=0&hl=" + $scope.currentLanguage + "&cc_load_policy=1");
		    }
	    }
    }
}]);

/**
 * Place this directive on a <video> element to define the poster image from the parent scope (in the parent, this should be '$scope.poster' as seen in enableVideo )
 */
enableAppDirectives.directive('enablePoster', [function() {

	return {
		restrict: 'A',
		replace: 'true',

		link: function ($scope, $element) {
		    var poster = '';
            if (typeof $scope.$parent.poster !== 'undefined' && $scope.$parent.poster !== '') {
	            $element.attr('poster', $scope.$parent.poster);
            }

		}

	}
}]);

/**
 *
 * @ngdoc directive
 * @name enableAudio
 * @scope true
 * @restrict AE
 * @param {string} sndid The id of the local video file. This id will be used for the poster image and the subtitles
 * @description
 * Directive that creates an audio player with the audio id provided. The player expects and will provide sounds tracks in 2 formats, m4a and ogg.
 *
 */
enableAppDirectives.directive('enableAudio', ['$sce','$route', function($sce, $route) {
    return {
        scope:{
            sndid: '@'
        },
        restrict: 'E',
        replace: 'true',
        templateUrl: 'partials/templates/enable-audio-template.html',
        link: function(scope) {
            scope.audiourlm4a = $sce.trustAsResourceUrl('partials/'+$route.current.params.level+'/media/snds/'+scope.sndid+'.m4a');
            scope.audiourlogg = $sce.trustAsResourceUrl('partials/'+$route.current.params.level+'/media/snds/'+scope.sndid+'.ogg');
        }
    };
}]);


/**
 *
 * @ngdoc directive
 * @name enableImage
 * @scope true
 * @restrict AE
 * @param {string} picname The name of the picture to insert (relative to the media folder where the section is loaded from)
 * @param {string} picalt The alternative text for the picture to be read by screenreaders
 * @description
 * Directive that creates an audio player with the audio id provided. The player expects and will provide sounds tracks in 2 formats, m4a and ogg.
 *
 */
enableAppDirectives.directive('enableImage', ['$sce','$route', function($sce, $route) {
    return {
        scope:{
            picname: '@',
            picalt: '@',
        },
        restrict: 'E',
        replace: 'true',
        template: '<img src="{{picsrc}}" width="100%" alt="{{picalt}}">',
        link: function(scope) {
            scope.picsrc = $sce.trustAsResourceUrl('partials/'+$route.current.params.level+'/media/pics/'+scope.picname);
        }
    };
}]);


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
enableAppDirectives.directive('enableSlideshow', ['$http', '$route', function($http, $route) {
    return {
        scope:{
            path: '@'
        },
        restrict: 'E',
        replace: 'true',
        templateUrl: 'partials/templates/enable-slideshow-template.html',

        link: function(scope) {
            scope.currentIndex = 0; // Initially the index is at the first image
            scope.images = [];

            scope.abspath = 'partials/'+$route.current.params.level+'/media/pics/slideshows/'+scope.path;

            $http.get(scope.abspath+'/init.json').then(function(res) {
                res.data.forEach(function (slide) {
                    slide.src = scope.abspath+"/"+slide.src;
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
                /*scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;*/

                if(scope.currentIndex < scope.images.length - 1) {
                    scope.currentIndex++;
                }
                else {
                    scope.currentIndex = 0;
                }
            };

            scope.prev = function() {
                /*scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;*/

                if(scope.currentIndex > 0) {
                    scope.currentIndex--;
                }
                else {
                    scope.currentIndex = scope.images.length - 1;
                }
            };

        }
    };
}]);


/**
 *
 * @ngdoc directive
 * @name enableMoreButton
 * @scope true
 * @restrict AE
 * @description
 * Directive that creates an expandable read more section, with the text wrapped in
 *
 */
enableAppDirectives.directive('enableReadMore', [function() {
    return {
        scope:{
            label: '@'
        },
        restrict: 'E',
        replace: 'true',
        transclude: true,
        templateUrl: 'partials/templates/enable-read-more-template.html',
        link: function(scope) {
            scope.openState = false;

            if(scope.label === undefined) {
                scope.label = 'read more';
            }

            scope.toggleOpen = function() {
                scope.openState = !scope.openState;
            };
        }
    };
}]);



/**
 * @ngdoc directive
 * @name enableGreybox
 * @restrict E
 * @description
 * Add this attribute to make 'grey box' element.
 *  * g-type:   The type of box to create: '' (no icon) 'warning', or 'funfact'
 * <pre><enable-greybox g-type='warning'> This is the grey box content </enable-greybox></pre>
 */
enableAppDirectives.directive("enableGreyBox", function() {
        var linker = function(scope) {
            scope.icon = "";
            if(scope.eType) {
                if (scope.eType === 'funfact') {
                    scope.icon = "870-smile@2x.svg";
                }
                else if (scope.eType === 'warning') {
                    scope.icon = "791-warning@2x.svg";
                }
                else if (scope.eType === 'story') {
                    scope.icon = "961-book-32@2x.svg";
                }
                else if (scope.eType === 'quote') {
                    scope.icon = "quotation.svg";
                }
            }
        };
        return {
            templateUrl: "partials/templates/enable-greybox-template.html",
            link: linker,
            restrict: 'E',
            transclude : true,
            scope: {
                eType: '@'
            }
        };
    });

/**
 * @ngdoc directive
 * @name enableQuickQuestion
 * @restrict E
 * @description
 * Add this attribute to make an element (use a div) containing 'did you know?' comment.
 * The answer will be shown after clicking anywhere in the box
 *  * e-question:   The question being asked
 *  * e-answer:   The answer to the question
 * <pre><enable-quick-question e-question="Did you know?" e-answer="No I didn't!"></enable-quick-question></pre>
 */
enableAppDirectives.directive("enableQuickQuestion", function() {
    var linker = function(scope) {
        scope.answerState = false;
        scope.answer = function() {
            scope.answerState = !scope.answerState;
        };
    };
    return {
        templateUrl: "partials/templates/enable-quick-question-template.html",
        restrict: 'E',
        transclude : true,
        link: linker,
        scope : {
            eQuestion : '@',
            eAnswer : '@'
        }
    };
});

/**
 * @ngdoc directive
 * @name enable-link
 * @restrict E
 * @description
 * Add this attribute to improve on the '<a>' link element showing an external link icon.
 * <pre><enable-link href="..."></enable-link></pre>
 */
enableAppDirectives.directive("enableLink", function() {
    var linker = function(scope) {
        scope.linkiconpath = "img/icons/directives/link/702-share@2x.svg";
    };
    return {
        template: '<a class="enablelink" href="{{href}}" target="_blank"><ng-transclude></ng-transclude><ng-include src="linkiconpath"></ng-include></a>',
        restrict: 'E',
        transclude : true,
        link : linker,
        scope : {
            href : '@'
        }
    };
});

/**
 * @ngdoc directive
 * @name enableQuotebox
 * @restrict E
 * @description
 * Add this attribute to make 'quote box' element.
 *  * e-type:   The type of box to create: 'quote' or 'story'
 * <pre><enable-quotebox e-type="story"> This is the quote box content </enable-quotebox></pre>
 */
enableAppDirectives.directive("enableQuotebox", function() {
    return {
        templateUrl: "partials/templates/enable-quotebox-template.html",
        restrict: 'E',
        transclude : true,
        scope: {
            eType: '@'
        }
    };
});


/**
 * @ngdoc directive
 * @name enableQuiz
 * @restrict E
 * @description
 * Add this element anywhere to create a quiz. Quiz questions are taken from database using the 'h-id'.
 *     * e-id:        Must match the ID in the quiz database              ("id")
 *     * e-shuffle-questions:   Shuffle the questions each time quiz is taken   (true, false)
 *      <pre><enable-quiz></enable-quiz></pre>
 */
enableAppDirectives.directive("enableQuiz", ['$http', '$route', '$timeout', '$sce', function($http, $route, $timeout, $sce) {
    var linker = function(scope) {
        var quiz;
        scope.filePath = "";
        scope.showLoginButton = false;
        scope.showAlreadyPassedDownloadButton = false;
        scope.showLanguageSwitch = false;
        scope.inSecondLanguage = false;
        scope.incorrectAnswers = [];

        scope.abspath = 'partials/'+$route.current.params.level+'/quiz/'+scope.path;

        $http.get(scope.abspath+'/init.json').then(function(res) {

            if(res.data !== {}) {
                scope.quizpoll = res.data;
                console.log('--> quiz: '+scope.path+' loaded');


                // Initialise attribute variables
                if (typeof scope.hShuffleQuestions === "undefined") { scope.hShuffleQuestions = false; }

                scope.trustResource = function getTrustedHtml(resourceUrl) {
                    return $sce.trustAsHtml(resourceUrl);
                };

                // The following functions represent a state machine controlling the quiz template using 'scope.state'

                scope.chooseLanguage = function(toggle) {
                    scope.inSecondLanguage = toggle;
                    scope.reload(true);
                };
                scope.reload = function() {        // Load quiz from JSON, set up data structures
                    quiz = scope.quizpoll;
                    scope.state = "begin";
                    scope.type = "radio";
                    scope.totalPages = quiz.questions.length;
                    scope.radioTempData = { state : -1};                // Holds the index of the selected radio button
                    scope.title = quiz.title || "(placeholder title)";
                    scope.intro = quiz.intro;
                    scope.percentScore = 0;
                    scope.diploma_link = "";
                    scope.passPercent = 80;
                    scope.summarypass = quiz.summarypass;
                    scope.summaryfail = quiz.summaryfail;
                    scope.image_url = quiz.image_url;
                    scope.currentQuestion = {};
                    scope.data = { answers: [], student_id: '', score: 0 };
                    scope.filePath = "img/quiz/";
                };
                scope.check = function(index) {         // Update UI elements after selection
                    if(scope.state !== 'question') { return; }
                    if(scope.currentQuestion.type === 'checkbox') {
                        scope.currentData[index] = !scope.currentData[index];
                        scope.resultDisabled = true;
                        for(var j=0; j<scope.currentData.length; j++) {
                            if (scope.currentData[j]) { scope.resultDisabled = false; }
                        }
                    }
                    else if(scope.currentQuestion.type === 'radio') {
                        scope.radioTempData.state = index;
                        for(var i=0; i<scope.currentData.length; i++ ) {
                            scope.currentData[i] = false;
                        }
                        scope.currentData[index] = true;
                        scope.resultDisabled = false;
                    }
                    scope.answer();
                };
                scope.clickStart = function() {
                    scope.start();
                };
                scope.start = function() {      // Set up data structure for answers
                    scope.pageIndex = -1;
                    scope.currentData = null;
                    scope.responseStatus = "";
                    scope.resultDisabled = true;
                    scope.maxscore = 0;
                    scope.data.score = 0;
                    scope.data.answers = [];     // Create an array that stores answers for each question
                    quiz.questions.forEach(function(q) {                        // Set up a 2D array to store answers for each question
                        var answerPage = [].repeat(false, q.answers.length);
                        scope.data.answers.push(answerPage);
                        for(var j=0; j<q.answers.length;j++) {
                            if (q.answers[j].correct) { scope.maxscore++ ; }          // Total of the correct answers for this quiz
                        }
                    });
                    scope.next();
                };
                scope.answer = function() {     // Accumulate the score
                    if(scope.currentQuestion.type === "radio") {                                           // Radio on correct gains a mark. Radio on incorrect scores 0.
                        if (scope.currentQuestion.answers[scope.radioTempData.state].correct) {
                            scope.data.score++;                                                         // Only one possible correct answer
                        }
                        else {
                            scope.incorrectAnswers.push(scope.currentQuestion.text);
                        }
                    }
                    else if(scope.currentQuestion.type === "checkbox") {                                 // Checking an incorrect box loses a mark. Checking a correct box gains a mark. Not checking a correct or incorrect box does nothing.
                        for(var j=0; j<scope.currentQuestion.answers.length;j++) {                      // Multiple possibly correct answers, convert to boolean before comparing
                            if(scope.currentQuestion.answers[j].correct && scope.currentData[j]) {
                                scope.data.score++;
                            }
                            else if(scope.currentQuestion.answers[j].correct === false && scope.currentData[j] === true) {
                                scope.data.score--;
                                scope.incorrectAnswers.push(scope.currentQuestion.text);
                            }
                            else {
                                scope.incorrectAnswers.push(scope.currentQuestion.text);
                            }
                        }
                    }
                    var theScore = Math.floor(scope.data.score / scope.maxscore * 100);
                    scope.percentScore = theScore < 0 ? 0 : theScore;

                    $timeout(function() {           // Safari will not reliably update the DOM if not using $timeout
                        scope.state = "result";
                    }, 0);

                };

                scope.next = function() {       // Prepare for the next question
                    scope.state = "question";
                    scope.pageIndex++;
                    scope.resultDisabled = true;
                    scope.radioTempData.state = -1;
                    if(scope.pageIndex === scope.totalPages) {
                        scope.state = "end";
                    }
                    else {
                        scope.currentData = scope.data.answers[scope.pageIndex];
                        scope.currentQuestion = quiz.questions[scope.pageIndex];
                        scope.type = scope.currentQuestion.type;
                        if(scope.currentQuestion.image_url !== "") {
                            scope.image_url = scope.abspath+'/'+scope.currentQuestion.image_url;
                        }
                        else {
                            scope.image_url = "";
                        }
                        //scope.image_url = (scope.currentQuestion.image_url !== "") ? scope.filePath + scope.currentQuestion.image_url : "";
                    }

                };
                scope.reload(false);
            }

        });

         // true = start test after loading
    };
    return {
        restrict: 'E',
        link: linker,
        templateUrl: "partials/templates/enable-quiz-template.html",
        scope:{
            path: '@'
        },
    };
}]);

/**
 * @ngdoc directive
 * @name enable-file-link
 * @restrict E
 * @description
 * Add this attribute to improve on the '<a>' link element showing an external link icon.
 * <pre><enable-link href="..."></enable-link></pre>
 */
enableAppDirectives.directive("enableFileLink", function() {
    var linker = function(scope) {
        scope.linkiconpath = "img/icons/directives/link/702-share@2x.svg";
    };
    return {
        template: '<a class="enablelink" href="partials/files/{{href}}" target="_blank"><ng-transclude></ng-transclude><ng-include src="linkiconpath"></ng-include></a>',
        restrict: 'E',
        transclude : true,
        link : linker,
        scope : {
            href : '@'
        }
    };
});