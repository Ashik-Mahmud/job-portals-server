/* AppliedJob Schema */
const mongoose = require('mongoose');
const validator = require("validator")
const AppliedJobSchema = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Jobs'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    resumeLink: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return validator.isURL(v);
            }
        }
    },
    portfolioLink: {
        type: String,
        validate: {
            validator: function(v) {
                return validator.isURL(v);
            }
        }
    },
    linkedInLink: {
        type: String,
        validate: {
            validator: function(v) {
                return validator.isURL(v);
            }
        }
    },
    githubLink: {
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