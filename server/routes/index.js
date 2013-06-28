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
    req.session = null;
    res.redirect('/');
};

exports.home = function (req, res) {
    console.log(req.session);
    res.render('home', {
        title: 'Qanban - Home'
    });
};