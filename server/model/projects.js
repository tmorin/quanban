var uuid = require('node-uuid');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TaskSchema = require('./tasks').TaskSchema;
var EventSchema = require('./events').EventSchema;

var ProjectSchema, Project;

ProjectSchema = exports.ProjectSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    creator: {
        type: String,
        ref: 'User',
        required: true
    },
    owner: {
        type: String,
        ref: 'User',
        required: true
    },
    members: [{
        user: {
            type: String,
            ref: 'User',
            required: true
        },
        roles: [String]
    }],
    events: [EventSchema],
    eventsCnt: Number,
    tasks: [TaskSchema],
    tasksCnt: Number,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    alive: {
        type: Boolean,
        default: true
    }
});

// Task management

ProjectSchema.methods.addNewTask = function (data) {
    var task = this.tasks.create(data);
    this.tasks.addToSet(task);
}

ProjectSchema.methods.getTask = function (taskId) {
    this.tasks.id(taskId);
}

ProjectSchema.methods.updateTask = function (taskId, data) {
    var task = this.tasks.id(taskId);
    task.set(data);
}

ProjectSchema.methods.removeTask = function (taskId) {
    this.tasks.remove({ _id: taskId });
}

// Task management

ProjectSchema.methods.addNewEvent = function (data) {
    var event = this.events.create(data);
    this.tasks.addToSet(event);
}

Project = exports.Project = mongoose.model('Project', ProjectSchema);
