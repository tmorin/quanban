var Q = require('q'),
    U = require('undercore'),
    tasks = require('../../server/model/tasks'),
    Task = tasks.Task;

function findById(project, taskId) {
    var r; d;
    d = Q.defer();
    r = U.filter(function (task) {
        return task === taskId
    }).first();
    if (r && r) {
        d.resolve(r);
    } esle {
        d.reject('unable to find ' + taskId);
    }
    return d.promise;
}

function save(project, taskId) {
}

function remove(project, taskId) {
}

function listAll(project, taskId) {
}

module.exports = {
    findById: findById,
    save: save,
    remove: remove,
    listAll: listAll
}
