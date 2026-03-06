const mongoose = require('mongoose');

const serviceRequestSchema = mongoose.Schema(
    {
        studentName: {
            type: String,
            required: [true, 'Please add a student name'],
        },
        studentId: {
            type: String,
            required: [true, 'Please add a student ID'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
        },
        category: {
            type: String,
            required: [true, 'Please select a category'],
        },
        priority: {
            type: String,
            required: [true, 'Please select a priority'],
        },
        location: {
            type: String,
            required: [true, 'Please add a location'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        status: {
            type: String,
            default: 'Pending',
            enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
