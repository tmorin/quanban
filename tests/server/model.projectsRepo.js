var mongoose = require('mongoose'),
    Q = require('q'),
    conf = require('../../server/conf'),
    chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    projects = require('../../server/model/projects'),
    users = require('../../server/model/users'),
    Project = projects.Project,
    User = users.User,
    projectsRepo = require('../../server/model/projectsRepo');

mongoose.connect(conf.db.url, null, null, null);
mongoose.connection.on('error', function (err) {
    throw err;
});

describe('projectsRepo', function () {

    var creator1, member1, project1;

    beforeEach(function (done) {
            
        creator1 = new User({
            username: 'creator1',
            email: 'creator1@email.com',
            oauth: {
                provider: 'google',
                identifier: 'google-creator1',
                meta: {
                    token: 'token-creator1'
                }
            }
        });

        member1 = new User({
            username: 'member1',
            email: 'member1@email.com',
            oauth: {
                provider: 'google',
                identifier: 'google-member1',
                meta: {
                    token: 'token-member1'
                }
            }
        });

        project1 = new Project({
            name: 'project1',
            description: 'description1',
            creator: creator1,
            owner: creator1,
            members: [{
                user: member1
            }]
        });

        Project.remove({}, function (err) {
            if (err) {
                throw done(err);
            }
            User.remove({}, function (err) {
                if (err) {
                    throw done(err);
                }
                creator1.save(function (err) {
                    if (err) {
                        throw done(err);
                    }
                    member1.save(function (err) {
                        if (err) {
                            throw done(err);
                        }
                        project1.save(function (err) {
                            if (err) {
                                throw done(err);
                            }
                            done();
                        });
                    });
                });
            });
        });
    });

    describe('#save', function () {
        it('should save a new project', function (done) {
            var project = new Project({
                name: 'project2',
                description: 'description2',
                creator: creator1._id,
                owner: creator1._id,
                member: [{
                    user: member1._id
                }]
            });
            projectsRepo.save(project).fail(done).then(function (project) {
                should.exist(project);
                done();
            });
        });
    });

    describe('#findById', function () {
        it('should find an existing project', function (done) {
            projectsRepo.findById(project1._id).fail(done).then(function (project) {
                should.exist(project);
                done();
            });
        });
    });

    describe('#listFromCreator', function () {
        it('should find an existing project', function (done) {
            projectsRepo.listFromCreator(creator1._id).fail(done).then(function (projects) {
                expect(projects).exist;
                expect(projects.length).equal(1);
                done();
            });
        });
    });

    describe('#listFromOwner', function () {
        it('should find an existing project', function (done) {
            projectsRepo.listFromOwner(creator1._id).fail(done).then(function (projects) {
                expect(projects).exist;
                expect(projects.length).equal(1);
                done();
            });
        });
    });

    describe('#listFromMember', function () {
        it('should find an existing project', function (done) {
            projectsRepo.listFromMember(member1._id).fail(done).then(function (projects) {
                expect(projects).exist;
                expect(projects.length).equal(1);
                done();
            });
        });
    });

    describe('#remove', function () {
        it('should remove an existing project', function (done) {
            projectsRepo.remove(project1._id).fail(done).then(function (project) {
                should.exist(project);
                Project.findById(project1._id, function (result) {
                    should.not.exist(result);
                    done();
                });
            });
        });
    });

});
