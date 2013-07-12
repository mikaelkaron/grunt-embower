module.exports = function (grunt) {
	var ARRAY_FOREACH = Array.prototype.forEach;

	return function requires() {
		var me = this;
		var success = true;

		ARRAY_FOREACH.call(arguments, function (option) {
			if (!(option in me)) {
				grunt.log.error("'" + option + "' is missing");
				success = false;
			}
		});

		if (!success) {
			grunt.fail.warn("Required options missing.");
		}

		return success;
	};
};