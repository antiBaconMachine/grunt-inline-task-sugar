/*
 * grunt-inline-task-sugar
 * https://github.com/antiBaconMachine/grunt-inline-task-sugar
 *
 * Copyright (c) 2014 Ollie Edwards
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');
var inline = require('../lib/inline');

module.exports = function (grunt) {

    var registerGrunt = grunt.registerTask;
    grunt.registerTask = function () {
        var args = _.toArray(arguments);
        var obj = args[1];
        if (obj && _.isObject(obj)) {
            args[1] = inline(obj, grunt.extendConfig);
        }
        registerGrunt.apply(grunt, args);
    };
};
