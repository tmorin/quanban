var Q = require('q'),
    U = require('undercore'),
    tasks = require('../../server/model/tasks'),
    Task = tasks.Task;

function findById(project, taskId) {
    var d, t;
    d = Q.defer();
    t = project.tasks.id(taskId);
    if (t) {
        d.resolve(t);
    } else {
        d.reject('unable to find ' + taskId);
    }
    return d.promise;
}

function save(project, task) {
    project.tasks.push(task);
}

function remove(project, taskId) {
    
}

function listAll(project) {
    var d, t;
    d = Q.defer();
    t = project.tasks;
    if (t) {
        d.resolve(t);
    } else {
        d.reject('unable to find ' + taskId);
    }
    return d.promise;
}

function listEventsFrom(projectId, from) {
    // TODO: not tested
    return findById(projectId).then(function (project) {
        return project.events;
    });
}

module.exports = {
    findById: findById,
    save: save,
    remove: remove,
    listAll: listAll,
    listEventsFrom: listEventsFrom
}
