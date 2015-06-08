/*
 * To run the protractor test, do the following:
 *  - open a new terminal window and start the web server by running the command 'npm start'
 *  - open a new terminal window and start the selenium server by running the command 'webdriver-manager start' (info and install http://angular.github.io/protractor/#/tutorial)
 *  - to run the test, open a new terminal window and start test by running the command 'protractor protractor.conf.js'
 *
 */

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['test/spec.js'],

    allScriptsTimeout: 11000,

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:8000/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }

}