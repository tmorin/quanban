var uuid = require('node-uuid');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema, Event;

EventSchema = exports.EventSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    who: {
        type: String,
        ref: 'User',
        required: true
    },
    what: {
        type: String,
        required: true
    },
    when: {
        type: Date,
        default: Date.now
    },
    alive: {
        type: Boolean,
        default: true
    }
});

Event = exports.Event = mongoose.model('Event', EventSchema);