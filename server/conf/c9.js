module.exports = {};

module.exports.db = {
    url: 'mongodb://developer:developer@ds027688.mongolab.com:27688/quanban-dev'
};

module.exports.passport = {
    google: {
        returnURL: 'http://tmorin.tmorin.c9.io/auth/google/return',
        realm: 'http://tmorin.tmorin.c9.io/'
    }
};
