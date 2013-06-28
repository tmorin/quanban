var uuid = require('node-uuid');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema, Comment;

CommentSchema = exports.CommentSchema = new Schema({
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
    replies: [CommentSchema],
    alive: {
        type: Boolean,
        default: true
    }
});

Comment = exports.Comment = mongoose.model('Comment', CommentSchema);