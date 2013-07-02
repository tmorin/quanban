var users = require('./users'),
    projects = require('./projects'),
    tasks = require('./tasks'),
    comments = require('./comments');

exports.projects = projects;
exports.tasks = tasks;
exports.comments = comments;
exports.users = users;
    
exports.index = function (req, res) {
    res.render('index', {
        title: 'Qanban - Welcome'
    });
};

exports.login = function (req, res) {
    res.render('login', {
        title: 'Qanban - Login'
    });
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.app = function (req, res) {
    res.render('app', {
        title: 'Qanban - App'
    });
};
