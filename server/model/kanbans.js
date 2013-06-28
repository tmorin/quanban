var uuid = require('node-uuid'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    events = require('./events'),
    comments = require('./comments'),

    KanbanSchema, Kanban;

KanbanSchema = exports.KanbanSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    step: {
        type: String,
        required: true,
        lowercase: true
    },
    creator: {
        type: String,
        ref: 'User',
        required: true
    },
    actor: {
        type: String,
        ref: 'User'
    },
    events: [events.EventSchema],
    comments: [comments.CommentSchema],
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    alive: {
        type: Boolean,
        default: true
    }
});

Kanban = exports.Kanban = mongoose.model('Kanban', KanbanSchema);