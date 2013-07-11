/*
 * grunt-enbower/list
 * https://github.com/mikaelkaron/grunt-git-dist
 *
 * Copyright (c) 2013 Mikael Karon
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
	/*global global*/
	"use strict";

	var TEMPLATE = "template";
	var DELIMITERS = "delimiters";
	var DEPENDENCIES = "dependencies";
	var MISSING = "missing";

	var _ = grunt.util._;
	var bower = require("bower-canary");
	var exports = require("../utils/exports")(grunt);
	var process = require("../utils/process")(grunt);

	grunt.task.registerTask("enbower-list", "List bower components", function (context) {
		var done = this.async();
		var options = this.options();
		var template = options[TEMPLATE];

		grunt.log.verbose.writeflags(options);

		bower.commands
			.list()
			.on("end", function (tree) {
				var result = {};
				var dependencies = tree[DEPENDENCIES];

				Object.keys(dependencies).forEach(function (name) {
					var data = dependencies[name];

					if (data[MISSING]) {
						grunt.log.error("Dependency " + name.cyan + " is missing.");
					}
					else {
						result[name] = process.call(template ? _.clone(template) : {}, {
							"data" : data,
							"delimiters" : options[DELIMITERS] || "enbower"
						});
					}
				});

				exports.call(options, result);

				done(true);
			});
	});
};
