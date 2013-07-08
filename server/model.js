var Projects = new Meteor.Collection("projects");

if (Meteor.isServer) {
    Meteor.startup(function () {
        var nbrProjects = Projects.find().count();
        console.log('nbrProjects', nbrProjects);
    });
}
