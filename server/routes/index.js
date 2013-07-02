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
