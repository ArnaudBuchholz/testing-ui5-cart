/* global module require*/

// karma configuration for continuous integration
module.exports = function(config) {
	"use strict";

	/* eslint-disable no-unused-vars*/
	require("./karma.conf")(config);
	/* eslint-enable no-unused-vars*/

	config.set({

		basePath: ".",

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'webapp/controller/*.js': ['coverage']
		},
		autoWatch: true,
		coverageReporter: {
			includeAllSources: true,
			reporters: [
				{
					type: 'html',
					dir: './coverage/'
				},
				{
					type: 'text'
				}
			],
			check: {
				each: {
					statements: 60,
					branches: 0,
					functions: 60,
					lines: 60
				}
			}
		},
		client: {
			qunit: {
				showUI: true
			}
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'coverage'],

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		// browsers: ['ChromeHeadless'],
		browsers: ['ChromeHeadless'],
		browserNoActivityTimeout: 60000,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true
	});
};
