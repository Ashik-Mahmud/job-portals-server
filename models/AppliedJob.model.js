/* AppliedJob Schema */
const mongoose = require('mongoose');
const validator = require("validator")
const Schema = mongoose.Schema;
const AppliedJobSchema = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Jobs'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    resume: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return validator.isURL(v);
            }
        }
    },
    portfolio: {
        type: String,
        validate: {
            validator: function(v) {
                return validator.isURL(v);
            }
        }
    },
    linkedIn: {
        type: String,
        validate: {
            validator: function(v) {
                return validator.isURL(v);
            }
        }
    },
    github: {
        type: String,
        validate: {
            validator: function(v) {
                return validator.isURL(v);
            }
        }
    },
    coverLetter: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const AppliedJob = mongoose.model('AppliedJob', AppliedJobSchema);
module.exports = AppliedJob;