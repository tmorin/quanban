var mongoose = require('mongoose'),
    Q = require('q'),
    conf = require('../../server/conf'),
    chai = require('chai'),
    should = chai.should(),
    users = require('../../server/model/users'),
    User = users.User,
    usersRepo = require('../../server/model/usersRepo');

mongoose.connect(conf.db.url, null, null, null);
mongoose.connection.on('error', function (err) {
    throw err;
});

describe('userRepo', function () {

    var user1;

    beforeEach(function (done) {
        User.remove({}, function (err) {
            if (err) {
                throw done(err);
            }

            user1 = new User({
                username: 'user1',
                email: 'user1@email.com',
                oauth: {
                    provider: 'google',
                    identifier: 'google-user1',
                    meta: {
                        token: 'atoken'
                    }
                }
            });

            usersRepo.save(user1).fail(done).done(function () {
                done()
            });
        });
    });

    describe('#save', function () {

        it('should save a new user', function (done) {
            var user = new User({
                username: 'user2',
                email: 'user2@email.com',
                oauth: {
                    provider: 'google',
                    identifier: 'google-user2',
                    meta: {
                        token: 'atoken'
                    }
                }
            });
            usersRepo.save(user).fail(done).done(function (user) {
                should.exist(user);
                done();
            });
        });

    });

    describe('#findOrCreate', function () {

        it('should save a new user', function (done) {
            var oauth = {
                provider: 'fake provider',
                identifier: 'fake identifier'
            }, email = 'a@a.fr';
            usersRepo.findOrCreate(oauth, {email: email}).fail(done).done(function (user) {
                should.exist(user);
                done();
            });
        });

        it('should find an existing user', function (done) {
            var oauth = user1.oauth, email = user1.email;
            usersRepo.findOrCreate(oauth, {email: email}).fail(done).done(function (user) {
                should.exist(user);
                done();
            });
        });

    });

    describe('#findById', function () {

        it('should find an existing user', function (done) {
            usersRepo.findById(user1._id).fail(done).done(function (user) {
                should.exist(user);
                user.id.should.equal(user1.id);
                done();
            });
        });

    });

    describe('#findByEmail', function () {

        it('should find an existing user', function (done) {
            usersRepo.findByEmail(user1.email).fail(done).done(function (user) {
                should.exist(user);
                user.id.should.equal(user1.id);
                done();
            });
        });

    });

    describe('#findByUsername', function () {

        it('should find an existing user', function (done) {
            usersRepo.findByUsername(user1.username).fail(done).done(function (user) {
                should.exist(user);
                user.id.should.equal(user1.id);
                done();
            });
        });

    });

    describe('#isUserExists', function () {

        it('should find an existing user by username', function (done) {
            var userToTest = {
                username: user1.username,
                email: 'email'
            }
            usersRepo.isUserExists(userToTest).then(function () {
                done('should fail');
            }).fail(function (err) {
                should.exist(err);
                done();
            });
        });

        it('should find an existing user by email', function (done) {
            var userToTest = {
                username: 'username',
                email: user1.email
            }
            usersRepo.isUserExists(userToTest).then(function () {
                done('should fail');
            }).fail(function (err) {
                should.exist(err);
                done();
            });
        });

        it('should find an existing user by oauth\'s identifier', function (done) {
            var userToTest = {
                username: 'username',
                email: 'email',
                oauth: user1.oauth
            }
            usersRepo.isUserExists(userToTest).then(function () {
                done('should fail');
            }).fail(function (err) {
                should.exist(err);
                done();
            });
        });

        it('should not find an existing user', function (done) {
            var userToTest = {
                username: 'username',
                email: 'email'
            }
            usersRepo.isUserExists(userToTest).then(function (user) {
                should.exist(user);
                user.should.equal(userToTest);
                done();
            }).fail(done);
        });

    });

});