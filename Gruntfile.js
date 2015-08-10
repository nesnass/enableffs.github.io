module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({
        clean: ['docs'],
        ngdocs: {
            options: {
                dest: 'docs',
                html5Mode: false,
                scripts: [
                    'bower_components/angular/angular.js',
                    'bower_components/angular-animate/angular-animate.js'
                ]
            },
            api: {
                src: ['js/*.js'],
                title: 'Enable portal javascript documentation'
            }
        },
        shell: {
            createSearchDictionary: {
                command: 'python siteindex.py'
            }
        },
        jshint: {
            // You get to make the name
            // The paths tell JSHint which files to validate
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            myFiles: ['js/*.js']
        },
    });

    grunt.registerTask('default', ['clean', 'ngdocs', 'shell:createSearchDictionary', 'jshint:myFiles']);

};