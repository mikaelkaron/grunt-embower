[![Build Status](https://travis-ci.org/mikaelkaron/grunt-bower-utils.png)](https://travis-ci.org/mikaelkaron/grunt-bower-utils)
[![NPM version](https://badge.fury.io/js/grunt-bower-utils.png)](http://badge.fury.io/js/grunt-bower-utils)

# grunt-bower-utils

> Release using git

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bower-utils --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bower-utils');
```

## The "bower-utils" task

### Overview
In your project's Gruntfile, add a section named `bower-utils` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  "bower-utils" : {
    "options" : {
      "file" : "out.txt",
      "global" : "global_name",
      "config" : "config.name"
    },
    "target": {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

> Note that since this is a [multi-task](http://gruntjs.com/creating-tasks#multi-tasks) you have to have at least one target defined for `bower-utils` (otherwise the task won't run)

### Options

#### options.file
Type: `String`  
Default value: `undefined`

A string value that is used as a filename to store output in.

#### options.global
Type: `String`  
Default value: `undefined`

A string value that is used as a global variable name to store output in.

#### options.config
Type: `String`  
Default value: `undefined`

A string value that is used as a configuration name to store output in.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 - Initial release  

