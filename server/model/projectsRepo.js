var Q = require('q'),
    projects = require('../../server/model/projects'),
    Project = projects.Project;

function findById(projectId) {
    return Q.nbind(Project.findById, Project)(projectId);
}

function save(project) {
    project.updated = Date.now();
    return Q.nbind(project.save, project)();
}

function remove(projectId) {
    return Q.nbind(Project.remove, Project)();
}

function listFromCreator(userId) {
    return Q.nbind(Project.find, Project)({
        'creator': userId
    });
}

function listFromOwner(userId) {
    return Q.nbind(Project.find, Project)({
        'owner': userId
    });
}

function listFromMember(userId) {
    return Q.nbind(Project.find, Project)({
        'members.user': userId
    });
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
    listFromCreator: listFromCreator,
    listFromOwner: listFromOwner,
    listFromMember: listFromMember,
    listEventsFrom: listEventsFrom
}
