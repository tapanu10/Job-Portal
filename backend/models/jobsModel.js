const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name is required'],
    },
    position: {
        type: String,
        required: [true, 'Job position is required'],
        maxlength: 100 // Adjusted minimum length, change as per your requirement
    },
    status: {
        type: String,
        enum: ['pending', 'rejected', 'interview'],
        default: 'pending'
    },
    workType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'contract'], // Corrected 'contaract' to 'contract'
        default: 'full-time'
    },
    workLocation: { // Corrected 'workLoction' to 'workLocation'
        type: String,
        default: 'Mumbai',
        required: [true, 'Work location is required']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
