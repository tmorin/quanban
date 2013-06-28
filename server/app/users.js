var Q = require('q'),
    usersRepo = require('../model/usersRepo'),
    users = require('../model/users'),
    User = users.User;

function register(username, email, account) {
    var user = new User({
        username: username,
        email: email,
        accounts: [account]
    });

    return usersRepo.isUserExists(user).thenInvoke(usersRepo.save);
}

function addAnAccount(actor, username, account) {}

module.exports = {
    register: register
}