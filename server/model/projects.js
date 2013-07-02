var uuid = require('node-uuid');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = require('./comments').CommentSchema;
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
    comments: [CommentSchema],
    events: [EventSchema],
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

Project = exports.Project = mongoose.model('Project', ProjectSchema);
