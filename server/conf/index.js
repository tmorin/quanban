var underscore = require('underscore'),
    defaultEnv = require('./default'),
    env = {}, selectedEnv;

function get() {
    var QUANBAN_ENV = process.env.QUANBAN_ENV;
    console.log('selected environment', QUANBAN_ENV || 'default');
    if (QUANBAN_ENV) {
        selectedEnv = require('./' + QUANBAN_ENV);
        underscore.extend(env, defaultEnv, selectedEnv);
    } else {
        underscore.extend(env, defaultEnv);
    }
    return env;
}

module.exports = get();