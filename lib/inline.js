var _ = require('lodash');

var getListOfTasks = function (taskObj) {
    return _(taskObj).map(function (conf, k) {
        return _.reduce(conf, function (acc, taskVal, taskName) {
            acc.push(k + ':' + taskName);
            return acc;
        }, []);
    }).flatten().value();
};

module.exports = function (task, cb) {
    if (!task) {
        return [];
    } else if (_.isPlainObject(task)) {
        cb(task);
        return getListOfTasks(task);
    } else if (_.isArray(task)) {
        return _(task).flatten().compact().map(function (t) {
            if (_.isPlainObject(t)) {
                cb(t);
                return getListOfTasks(t);
            }
            return t;
        }).flatten().value();
    }
    return task;
};