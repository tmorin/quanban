var Q = require('q'),
    comments = require('../../server/model/comments'),
    Comment = comments.Comment;

function findById(project, commentId) {
    var d, t;
    d = Q.defer();
    t = project.comments.get(commentId);
    if (t) {
        d.resolve(t);
    } else {
        d.reject('unable to find ' + commentId);
    }
    return d.promise;
}

function save(project, comment) {
}

function remove(project, commentId) {
    
}

function listAll(project) {
    var d, t;
    d = Q.defer();
    t = project.comments;
    if (t) {
        d.resolve(t);
    } else {
        d.reject('unable to find ' + commentId);
    }
    return d.promise;
}

module.exports = {
    findById: findById,
    save: save,
    remove: remove,
    listAll: listAll
}
