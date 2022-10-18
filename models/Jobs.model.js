const mongoose = require('mongoose');
const validator = require('validator');


const jobsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    jobType: {
        type: String,
        trim: true,
        enum: ["remote", "on-site", "hybrid"],
        required: true,
    },
    salary: {
        type: Number,
        required: true,
        trim: true
    }, 
    company: {
        type: String,
        required: true,
        trim: true
    },
    vacancy: {
        type: Number,
        default: 1,
        trim: true,
        min: [1, 'Minimum 1 vacancy required'],
        required: true,
    },
    deadLine: {
        type: String,
        required: true,
        trim: true,
    },
    hr: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Job = mongoose.model('Jobs', jobsSchema);
module.exports = Job;