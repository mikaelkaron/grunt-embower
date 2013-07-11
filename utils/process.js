module.exports = function (grunt) {
	return function process(options) {
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
};