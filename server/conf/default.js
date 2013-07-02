module.exports = {};

module.exports.db = {
    url: 'mongodb://localhost:27017/quanban-dev'
};

module.exports.passport = {
    google: {
        returnURL: 'http://localhost:3000/auth/google/return',
        realm: 'http://localhost:3000/'
    }
};

module.exports.session = {
    secret: 'secret'
};
