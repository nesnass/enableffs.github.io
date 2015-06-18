module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');

    grunt.initConfig({
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
        clean: ['docs'],
        shell: {
            createSearchDictionary: {
                command: 'python siteindex.py'
            }
        }
    });

    grunt.registerTask('default', ['clean', 'ngdocs', 'shell:createSearchDictionary']);

};