/*
 * grunt-inline-task-sugar
 * https://github.com/antiBaconMachine/grunt-inline-task-sugar
 *
 * Copyright (c) 2014 Ollie Edwards
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        bump: {
            options: {
                pushTo: 'origin'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        jasmine_node: {
            all: ['spec/']
        },


        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'spec/*.js',
                'lib/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    grunt.registerTask('test', ['jasmine_node', [
        'clean',
        'helloWorld',
        {
            "file-creator": {
                "basic": {
                    "tmp/basic.txt": function(fs, fd, done) {
                        fs.writeSync(fd, 'some basic text');
                        done();
                    }
                }
            }
        },
        'nodeunit'
    ]]);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', (grunt.option('dirty') ? null : 'test')]);



    grunt.registerTask('helloWorld', {
            shell: {
                hello: {
                    command: 'echo HELLO'
                },
                world: {
                    command: 'echo WORLD'
                }
            }
        }
    );
};
