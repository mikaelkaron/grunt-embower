module.exports = function (grunt) {
	var GLOBAL = "global";
	var CONFIG = "config";
	var FILE = "file";

	return function exports(result) {
		var me = this;

		if (GLOBAL in me) {
			global[me[GLOBAL]] = result;
		}

		if (CONFIG in me) {
			grunt.config.set(me[CONFIG], result);
		}

		if (FILE in me) {
			grunt.file.write(me[FILE], JSON.stringify(result, null, "\t"));
		}
	}
}