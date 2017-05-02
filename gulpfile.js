var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var gulp = require('gulp');
var clean = require('gulp-clean');
var shell = require('gulp-shell');
var ngAnnotate = require('gulp-ng-annotate');


gulp.task('default', ['clean', 'ngannotate', 'lint', 'shell', 'ngannotate', 'ngdocs']);

gulp.task('ngdocs', ['clean'], function () {
    var gulpDocs = require('gulp-ngdocs');
    var options = {
        scripts: [
            'bower_components/angular/angular.js',
            'bower_components/angular-animate/angular-animate.js'
        ],
        html5Mode: false,
        startPage: '/api',
        title: "Enable Project Documentation"
    };
    return gulpDocs.sections({
        api: {
            glob:['js/*.js'],
            api: true,
            title: 'API Documentation'
        }
    }).pipe(gulpDocs.process(options)).pipe(gulp.dest('./docs'));
});

gulp.task('shell', shell.task([
    'python siteindex.py'
]));

gulp.task('lint', function() {
    return gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
});

gulp.task('ngannotate', function () {
    var options = {
        singleQuotes: true
    };
    return gulp.src('./js/**.js')
        .pipe(ngAnnotate(options))
});

gulp.task('clean', function () {
    return gulp.src('./docs', {read: false})
        .pipe(clean());
});