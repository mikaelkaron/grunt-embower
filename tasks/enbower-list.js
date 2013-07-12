/*
 * grunt-embower/list
 * https://github.com/mikaelkaron/grunt-git-dist
 *
 * Copyright (c) 2013 Mikael Karon
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
	/*global global*/
	"use strict";

	var GLOBAL = "global";
	var CONFIG = "config";
	var FILE = "file";
	var TEMPLATE = "template";
	var DELIMITERS = "delimiters";
	var DEPENDENCIES = "dependencies";
	var MISSING = "missing";

	var _ = grunt.util._;
	var path = require("path");
	var bower = require("bower-canary");
	var exports = require("../utils/exports")(grunt);
	var process = require("../utils/process")(grunt);
	var requires = require("../utils/requires")(grunt);

	grunt.task.registerTask("embower-list", "List bower components", function (cwd) {
		// Create config object, add `cwd` if provided
		var config = _.extend({}, bower.config, cwd && {
			"cwd" : cwd
		})

		// Verbose log
		grunt.log.verbose.writeflags(config);

		// Create `options` defaults and then override from grunt config
		var options = {};
		options[DELIMITERS] = "embower";
		options = this.options(options);

		// With GLOBAL, CONFIG and FILE
		[ GLOBAL, CONFIG, FILE ]
			// Filter the ones not in `options`
			.filter(function (option) {
				return option in options;
			})
			// Iterate and process using `config` as `data`
			.forEach(function (option) {
				options[option] = grunt.template.process(options[option], {
					"data" : config,
					"delimiters" : options[DELIMITERS]
				});
			});

		// Verbose log
		grunt.log.verbose.writeflags(options);

		// Make sure we have all the `options` we need
		requires.call(options, TEMPLATE);

		var template = options[TEMPLATE];
		var done = this.async();

		bower.commands
			.list(null, config)
			.on("end", function (tree) {
				var dependencies = tree[DEPENDENCIES];
				var result = {};

				// Iterate dependency names
				Object.keys(dependencies).forEach(function (name) {
					// Create `data` from `dependencies` and extend with `config`
					var data = _.extend({
						"config" : config
					}, dependencies[name]);

					// Warn if the dependency is missing
					if (data[MISSING]) {
						grunt.log.error("Dependency " + name.cyan + " is missing in " + path.join(config.cwd, config.directory).cyan);
					}
					else {
						grunt.log.write("Processing", name.cyan, "... ");

						// Process each dependncy using `template`
						result[name] = process.call(_.clone(template), {
							"data" : data,
							"delimiters" : options[DELIMITERS]
						});

						grunt.log.ok();
					}
				});

				// Export `result`
				exports.call(options, result);

				// We're done
				done(true);
			});
	});
};
