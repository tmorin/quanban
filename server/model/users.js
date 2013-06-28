var uuid = require('node-uuid'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    UserSchema, User;

UserSchema = exports.UserSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    username: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    oauth: {
        provider: {type: String, required: true},
        identifier: {type: String, required: true},
        meta: Schema.Types.Mixed
    },
    profile: {
        firstname: String,
        lastname: String
    },
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

User = exports.User = mongoose.model('User', UserSchema);