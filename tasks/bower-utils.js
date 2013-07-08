/*
 * grunt-bower-utils
 * https://github.com/mikaelkaron/grunt-git-dist
 *
 * Copyright (c) 2013 Mikael Karon
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
	/*global global*/
	"use strict";

	var UNDEFINED;
	var ARRAY_FOREACH = Array.prototype.forEach;
	var GLOBAL = "global";
	var CONFIG = "config";
	var FILE = "file";
	var TEMPLATE = "template";
	var DELIMITER = "bower";

	var Manager = require("bower/lib/core/manager");
	var _ = grunt.util._;

	function process(options) {
		/*jshint validthis:true*/
		var me = this;

		switch (grunt.util.kindOf(me)) {
			case "object":
				Object.keys(me).forEach(function (key) {
					me[key] = process.call(me[key], options);
				});
				break;

			case "array":
				me.forEach(function (value, index) {
					me[index] = process.call(me[index], options);
				});
				break;

			case "string":
				me = grunt.template.process(me, options);
				break;
		}

		return me;
	}

	grunt.template.addDelimiters(DELIMITER, "{%", "%}");

	grunt.task.registerMultiTask("bower-utils", "Bower utils for grunt", function () {
		var target = this.target;
		var done = this.async();
		var options = this.options();
		var manager = new Manager();

		function requiresOptions () {
			var fail = false;

			ARRAY_FOREACH.call(arguments, function (option) {
				if (!(option in options)) {
					grunt.log.error("'" + option + "' is missing");
					fail = true;
				}
			});

			if (fail) {
				grunt.fail.warn("Required options missing.");
			}
		}

		// Log flags (if verbose)
		grunt.log.verbose.writeflags(options);

		switch (target) {
			case "components" :
				requiresOptions(TEMPLATE);

				manager
					.on("list", function (packages) {
						var result = {};

						Object.keys(packages).forEach(function (name) {
							result[name] = process.call(_.clone(options[TEMPLATE]), {
								"data" : packages[name],
								"delimiters" : DELIMITER
							});
						});

						if (GLOBAL in options) {
							global[options[GLOBAL]] = result;
						}

						if (CONFIG in options) {
							grunt.config.set(options[CONFIG], result);
						}

						if (FILE in options) {
							grunt.file.write(options[FILE], JSON.stringify(result, null, "\t"));
						}

						done(true);
					})
					.list();
				break;

			default :
				grunt.fail.warn("Unknown target '" + target + "'");
		}
	});
};
