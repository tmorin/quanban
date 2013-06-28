var Q = require('q'),
    users = require('../../server/model/users'),
    User = users.User;

function findById(userId) {
    return Q.nbind(User.findById, User)(userId);
}

function findByEmail(email) {
    return Q.nbind(User.findOne, User)({
        'email': email
    });
}

function findByUsername(username) {
    return Q.nbind(User.findOne, User)({
        'username': username
    });
}

function isUserExists(user) {
    var oauth = user.oauth || {};
    return Q.nbind(User.findOne, User)({
        $or: [{
            'username': user.username
        }, {
            'email': user.email
        }, {
            'oauth.provider': oauth.provider,
            'oauth.identifier': oauth.identifier
        }]
    }).then(function (userInDb) {
        var d = Q.defer();
        if ( !! userInDb) {
            d.reject(new Error('user already exists'));
        }
        else {
            d.resolve(user);
        }
        return d.promise;
    });
}

function findOrCreate(oauth, data) {
    return Q.nbind(User.findOne, User)({
        'oauth.provider': oauth.provider,
        'oauth.identifier': oauth.identifier
    }).then(function (user) {
        if (!user) {
            return save(new User({
                email: data.email,
                username: data.username,
                oauth: oauth
            }));
        }
        return user;
    });
}

function save(user) {
    user.updated = Date.now();
    return Q.nbind(user.save, user)();
}

module.exports = {
    findById: findById,
    findByUsername: findByUsername,
    findByEmail: findByEmail,
    findOrCreate: findOrCreate,
    isUserExists: isUserExists,
    save: save
};