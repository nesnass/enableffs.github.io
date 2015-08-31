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
            $timeout(function(){
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
        templateUrl: 'partials/templates/section-header-template.html',

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
 * @param {string} vididyt The id of the youtube video. This will bring up the youtube video player , as well as the CC attached to that video
 * @param {string} vididlc The id of the local video file. This id will be used for the poster image and the subtitles
 * @param {string} cclang The current language code. This will load the subtitles in the current portal language.
 * @param {boolean} localmode The mode that needs to be inserted in the page, true => local videos, false => youtube videos
 * @description
 * Directive that creates a local video player based on the localmode paramter with the video id provided and the language for the subtitles.
 *
 */
enableAppDirectives.directive('enableVideo', ['$sce','$route', function($sce, $route) {

    return {
        scope:{
            vididyt: '@',
            vididlc: '@',
            cclang: '@',
            localmode: '='
        },
        restrict: 'AE',
        replace: 'true',
        templateUrl: 'partials/templates/video-template.html',

        link: function(scope) {

            if(scope.localmode) {
                scope.vidurl = $sce.trustAsResourceUrl('partials/'+$route.current.params.level+'/media/vids/'+scope.vididlc+'.mp4');
                scope.vidtrack = $sce.trustAsResourceUrl('partials/'+$route.current.params.level+'/media/vids/'+scope.vididlc+"_"+scope.cclang+'.srt');
                scope.poster = 'partials/'+$route.current.params.level+'/media/pics/'+scope.vididlc+'__00_00_00_00.png';
            }
            else {
                scope.vidurl = $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+scope.vididyt+"?html5=1&controls=1&autohide=0&rel=0&showinfo=0&hl="+scope.cclang+"&cc_load_policy=1");
            }


        }
    };
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
        templateUrl: 'partials/templates/audio-local-template.html',
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
            scope.picsrc = $sce.trustAsResourceUrl('partials/'+$route.current.params.level+'/media/pics/'+scope.picpath);
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
        templateUrl: 'partials/templates/slideshow-template.html',

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
enableAppDirectives.directive('enableReadMore', ['EnableAppUtils', function(EnableAppUtils) {
    return {
        scope:{},
        restrict: 'E',
        replace: 'true',
        transclude: true,
        templateUrl: 'partials/templates/read-more-template.html',
        link: function(scope, element) {
            var dsid = EnableAppUtils.getRandomUUID();
            var el = element;
            console.log(el);
            scope[dsid] = false;

            scope.isOpen = function() {
                if(scope[dsid] === false) {
                    return false;
                }
                else {
                    return true;
                }
            };

            scope.toggleOpen = function() {
                scope[dsid] = !scope[dsid];
            };
        }
    };
}]);



/**
 * @ngdoc directive
 * @name enableGreybox
 * @restrict A
 * @description
 * Add this attribute to make 'grey box' element.
 *  * g-type:   The type of box to create: '' (no icon) 'warning', or 'funfact'
 * <pre><div enable-greybox g-type='warning'> This is the grey box content </div></pre>
 */
enableAppDirectives.directive("enableGreybox", function() {
        var linker = function(scope) {
            scope.icon = "";
            if(scope.eType) {
                if (scope.eType === 'funfact') {
                    scope.icon = "img/icons/directives/greybox/870-smile@2x.svg";
                }
                else if (scope.eType === 'warning') {
                    scope.icon = "img/icons/directives/greybox/791-warning@2x.svg";
                }
                else if (scope.eType === 'story') {
                    scope.icon = "img/icons/directives/greybox/961-book-32@2x.svg";
                }
                else if (scope.eType === 'quote') {
                    scope.icon = "img/icons/directives/greybox/quotation.svg";
                }
            }
        };
        return {
            templateUrl: "partials/templates/enablegreybox.html",
            link: linker,
            restrict: 'A',
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
 *      <pre><hmsquiz e-id="1" e-shuffle-questions="true"></hmsquiz></pre>
 */
enableAppDirectives.directive("enableQuiz", ['$http', '$route', '$timeout', '$sce','deviceDetector', 'DataService', function($http, $route, $timeout, $sce, $deviceDetector, DataService) {
    var linker = function(scope, element, attrs) {
        var quiz;
        var moduleNumber;
        scope.filePath = "";
        scope.showLoginButton = false;
        scope.showAlreadyPassedDownloadButton = false;
        scope.showLanguageSwitch = false;
        scope.inSecondLanguage = false;
        scope.incorrectAnswers = [];

        // Initialise attribute variables
        if (typeof scope.hShuffleQuestions === "undefined") scope.hShuffleQuestions = false;

        // Variables to enable login from the local Quiz login button


        scope.trustResource = function getTrustedHtml(resourceUrl) {
            return $sce.trustAsHtml(resourceUrl);
        };
        /* The following functions represent a state machine controlling the quiz template using 'scope.state' */

        scope.chooseLanguage = function(toggle) {
            scope.inSecondLanguage = toggle;
            scope.reload(true);
        };
        scope.reload = function(startQuiz) {        // Load quiz from JSON, set up data structures
            DataService.serverRequest('getQuizPoll', scope.requestData, QUIZPOLL_SS_PG_ABSOLUTE)
                .success(function(data, status) {
                    quiz = data.data;
                    scope.requestData.e3_id = data.data.e3_id;
                    scope.requestData.language = data.data.language;
                    moduleNumber = $route.current.params.module;
                    if(scope.hShuffleQuestions)
                        quiz.questions = DataService.shuffle(quiz.questions);
                    scope.state = "begin";
                    scope.type = "radio";
                    scope.totalPages = quiz.questions.length;
                    scope.radioTempData = { state : -1};                // Holds the index of the selected radio button
                    scope.title = quiz.title || "(placeholder title)";
                    scope.intro = quiz.intro;
                    scope.percentScore = 0;
                    scope.diploma_link = "";
                    scope.passPercent = scope.hPassPercent || QUIZ_PASS_PERCENT;
                    scope.summarypass = quiz.summarypass;
                    scope.summaryfail = quiz.summaryfail;
                    scope.image_url = quiz.image_url;
                    scope.currentQuestion = {};
                    scope.data = { answers: [], student_id: '', quiz_id: scope.hId, score: 0 };
                    scope.filePath = QUIZ_IMAGE_PATH;
                    checkLogin(startQuiz);
                });
        };
        scope.check = function(index) {         // Update UI elements after selection
            if(scope.state != 'question') return;
            if(scope.currentQuestion.type == 'checkbox') {
                scope.currentData[index] = !scope.currentData[index];
                scope.resultDisabled = true;
                for(var j=0; j<scope.currentData.length; j++) {
                    if (scope.currentData[j]) scope.resultDisabled = false;
                }
            }
            else if(scope.currentQuestion.type == 'radio') {
                scope.radioTempData.state = index;
                for(var i=0; i<scope.currentData.length; i++ )
                    scope.currentData[i] = false;
                scope.currentData[index] = true;
                scope.resultDisabled = false;
            }
            if(scope.hSingleQuestionQuiz || scope.hQuestionFeedback)
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
            if(scope.hShuffleQuestions)
                quiz.questions = DataService.shuffle(quiz.questions);   // Shuffle question array
            quiz.questions.forEach(function(q) {                        // Set up a 2D array to store answers for each question
                var answerPage = [].repeat(false, q.answers.length);
                scope.data.answers.push(answerPage);
                for(var j=0; j<q.answers.length;j++)
                    if(q.answers[j].correct) scope.maxscore++;          // Total of the correct answers for this quiz
            });
            scope.next();
        };
        scope.answer = function() {     // Accumulate the score
            if(scope.currentQuestion.type == "radio") {                                           // Radio on correct gains a mark. Radio on incorrect scores 0.
                if (scope.currentQuestion.answers[scope.radioTempData.state].correct)
                    scope.data.score++;                                                         // Only one possible correct answer
                else
                    scope.incorrectAnswers.push(scope.currentQuestion.text);
            }
            else if(scope.currentQuestion.type == "checkbox") {                                 // Checking an incorrect box loses a mark. Checking a correct box gains a mark. Not checking a correct or incorrect box does nothing.
                for(var j=0; j<scope.currentQuestion.answers.length;j++) {                      // Multiple possibly correct answers, convert to boolean before comparing
                    if(scope.currentQuestion.answers[j].correct && scope.currentData[j])
                        scope.data.score++;
                    else if(scope.currentQuestion.answers[j].correct == false && scope.currentData[j] == true) {
                        scope.data.score--;
                        scope.incorrectAnswers.push(scope.currentQuestion.text);
                    }
                    else
                        scope.incorrectAnswers.push(scope.currentQuestion.text);
                }
            }
            var theScore = Math.floor(scope.data.score / scope.maxscore * 100);
            scope.percentScore = theScore < 0 ? 0 : theScore;

            if(!scope.hQuestionFeedback && !scope.hQuestionFeedbackText)
                scope.next();
            else {
                $timeout(function() {           // Safari will not reliably update the DOM if not using $timeout
                    scope.state = "result";
                    if(!$deviceDetector.isMobile()) {   // Dont run if using a mobile device
                        var topDiv = angular.element(document.querySelector('#quiz-' + scope.hId));
                        topDiv[0].focus();
                    }
                }, 0);
            }
        };

        scope.next = function() {       // Prepare for the next question
            scope.state = "question";
            scope.pageIndex++;
            scope.resultDisabled = true;
            scope.radioTempData.state = -1;
            if(scope.pageIndex == scope.totalPages)
                scope.state = "end";
            else {
                scope.currentData = scope.data.answers[scope.pageIndex];
                scope.currentQuestion = quiz.questions[scope.pageIndex];
                scope.type = scope.currentQuestion.type;
                scope.image_url = (scope.currentQuestion.image_url != "") ? scope.filePath + scope.currentQuestion.image_url : "";
            }
            if(scope.pageIndex > 0) {       // In the case of a single quesiton quiz, running this on first load will change screen focus! So don't..
                if(!$deviceDetector.isMobile()) {  // Dont run if using a mobile device
                    $timeout(function () {           // hack to make sure the page is finished loaded and the div present when focusing on it
                        var topDiv = angular.element(document.querySelector('#quiz-' + scope.hId));
                        topDiv[0].focus();
                    }, 1000);
                }
            }

        };
        scope.reload(false); // true = start test after loading
    };
    return {
        restrict: 'E',
        scope: {
            eId: '=',
            eShuffleQuestions: '='
        },
        link: linker,
        templateUrl: "partials/templates/enablequiz.html"
    }
}]);
