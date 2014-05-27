# grunt-inline-task-sugar

> Plugin which provides following sugar features for registering grunt alias type tasks:

* Flatten nested arrays
* Remove falsy values
* Extend multi tasks inline

### Overview

This plugin does not expose any multi task targets. Instead it wraps the standard grunt.registerTask function 

### Usage examples

Nested arrays in task lists are flattened and falsy values removes. This allows for terse conditional evaluation

```js
grunt.registerTask('foo', [
    'standardTask',
    [
        'nestedTask',
        'nestedTask2'
    ],
    //Falsy value will be stripped
    (grunt.option('someCondition') ? 'conditionalTask' : null),
    (function() {
        return [
            'taskReturnedFromFunction'
        ];
    }())
    
]);
```

You can pass config objects inline, for example the following config will register the tasks `shell:hello` and `shell:world`
and convert the task definition to `['shell:hello', 'shell:world']`

```js
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
```

Config objects can also be nested in arrays

```js
grunt.registerTask('helloWorld', [
        'someTask',
        {
            shell: {
                hello: {
                    command: 'echo HELLO'
                },
                world: {
                    command: 'echo WORLD'
                }
            }
        },
        'someOtherTask'
    );
```

This will register the task helloWorld as an alias to `['someTask', 'shell:hello', 'shell:world', 'someOtherTask']`

Task inlining is achieved under the hood using the excellent [grunt-extend-config](https://www.npmjs.org/package/grunt-extend-config) plugin.

Remember, just because you can inline tasks doesn't mean you should! 


## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-inline-task-sugar --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-inline-task-sugar');

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

0.1.0: initial release
