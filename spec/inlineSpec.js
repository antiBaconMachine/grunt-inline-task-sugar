var inline = require('../lib/inline');

var noCallback = function () {
    throw 'callback should not have been activated';
};

describe('Inline task processing', function () {

    it('should accept a grunt config object, activate a callback to register with grunt and return string identifiers of those tasks', function () {

        var task = {
            shell: {
                foo: {
                    bar: '123'
                },
                spam: {
                    eggs: 'abc'
                }
            },
            copy: {
                foo: {
                    bar: '123'
                },
                spam: {
                    eggs: 'abc'
                }
            }
        };

        var callback = function (arg) {
            expect(arg).toEqual(task);
        };

        expect(inline(task, callback)).toEqual(['shell:foo', 'shell:spam', 'copy:foo', 'copy:spam']);
    });

    it('should extend grunt config with any objects in a nest of array and return keys', function () {
        var task1 = {
            shell: {
                foo: {
                    bar: '123'
                },
                spam: {
                    eggs: 'abc'
                }
            }
        };

        var task2 = {
            copy: {
                foo: {
                    bar: '123'
                },
                spam: {
                    eggs: 'abc'
                }
            }
        };

        var input = [
            'a:b',
            [
                task1,
                'c:d'
            ],
            task2
        ];

        var tasksToCreate = [];
        var callback = function (task) {
            tasksToCreate.push(task);
        };

        expect(inline(input, callback)).toEqual(['a:b', 'shell:foo', 'shell:spam', 'c:d', 'copy:foo', 'copy:spam']);
        expect(tasksToCreate[0]).toEqual(task1);
        expect(tasksToCreate[1]).toEqual(task2);
    });

    it('should remove falsy values from any input', function () {
        expect(inline(false, noCallback)).toEqual([]);
        expect(inline(['foo:bar', null, false, 0])).toEqual(['foo:bar']);
    });

    it('should flatten nested arrays', function () {
        expect(inline(['foo:bar', ['spam:eggs', ['junk:things']]]), noCallback).toEqual(['foo:bar', 'spam:eggs', 'junk:things']);
    });

    it('should remove falsy values from flattened arrays', function() {
        expect(inline(['foo:bar', 0, ['spam:eggs', false, ['junk:things', null]]]), noCallback).toEqual(['foo:bar', 'spam:eggs', 'junk:things']);
    });

    it('should return plain strings unchanged', function () {
        expect(inline('foo', noCallback)).toBe('foo');
    });
});