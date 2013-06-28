var chai = require('chai'),
    should = chai.should(),
    users = require('../../server/model/users'),
    User = users.User;

describe('users model', function () {

    var user1;

    beforeEach(function (done) {
        user1 = new User({
            username: 'user1',
            email: 'user1@email.com',
            accounts: [{
                provider: 'google',
                meta: {
                    token: 'atoken'
                }
            }]
        });
        done();
    });

    describe('create a user', function () {

        it('should save a new user', function (done) {
            var user = new User({
                username: 'user2',
                email: 'user2@email.com',
                accounts: [{
                    provider: 'google',
                    meta: {
                        token: 'atoken'
                    }
                }]
            });
            done();
        });

    });
});