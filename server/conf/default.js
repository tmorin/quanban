module.exports = {};

module.exports.db = {
    url: 'mongodb://localhost:27017/quanban-dev'
};

module.exports.passport = {
    google: {
        returnURL: 'http://www.example.com/auth/google/return',
        realm: 'http://www.example.com/'
    }
};

module.exports.session = {
    secret: 'secret'
};