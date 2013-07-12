[![Build Status](https://travis-ci.org/mikaelkaron/grunt-embower.png)](https://travis-ci.org/mikaelkaron/grunt-embower)
[![NPM version](https://badge.fury.io/js/grunt-embower.png)](http://badge.fury.io/js/grunt-embower)

# grunt-embower

> Grunt and bower sitting in a tree

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-embower --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-embower');
```

## The "embower-list" task

### Overview
In your project's Gruntfile, add a section named `embower-list` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  "embower-list" : {
    "options" : {
      "file" : "out.txt",
      "global" : "global_name",
      "config" : "config.name"
    }
  },
})
```

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
0.2.0 - Renamed project to `grunt-embower`
0.1.0 - Initial release as `grunt-bower-utils`  

