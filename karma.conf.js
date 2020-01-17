/* global module*/

// karma configuration for local testing
module.exports = function(config) {
	"use strict";

	config.set({
		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['ui5'],

		plugins: [
			'karma-coverage',
			'karma-ui5',
			'karma-chrome-launcher'
		],

		ui5:  {
			url: "https://sapui5.hana.ondemand.com/1.73.1/",
			type: "application",
			mode: "html",
			testpage: "webapp/test/testsuite.qunit.html"
		},

		client: {
			clearContext: true,
			qunit: {
				showUI: true
			}
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// level of browser logging
		browserConsoleLogOptions: {
			level: 'warn'
		},

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['ChromeHeadless'],
		browserNoActivityTimeout: 60000,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false

	});
};
