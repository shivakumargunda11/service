const ServiceRequest = require('../models/ServiceRequest');

// @desc    Create a service request
// @route   POST /api/requests
// @access  Public
const createRequest = async (req, res) => {
    try {
        const { category, priority, location, description } = req.body;

        if (!category || !priority || !location || !description) {
            res.status(400);
            throw new Error('Please add all fields');
        }

        const request = await ServiceRequest.create({
            studentName: req.user.name,
            studentId: req.user.email, // Using email as a unique student ID for now
            email: req.user.email,
            category,
            priority,
            location,
            description,
            user: req.user._id, // Store UID reference
        });

        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all service requests (Admin sees all, Student sees theirs)
// @route   GET /api/requests
// @access  Private
const getRequests = async (req, res) => {
    try {
        let requests;
        if (req.user.role === 'admin') {
            requests = await ServiceRequest.find().sort({ createdAt: -1 });
        } else {
            requests = await ServiceRequest.find({ email: req.user.email }).sort({ createdAt: -1 });
        }
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get requests by Student ID
// @route   GET /api/requests/:studentId
// @access  Private
const getRequestsByStudentId = async (req, res) => {
    try {
        // If student, check if they're asking for their own
        if (req.user.role !== 'admin' && req.user.email !== req.params.studentId) {
            res.status(401);
            throw new Error('User not authorized');
        }
        
        const requests = await ServiceRequest.find({ studentId: req.params.studentId }).sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update request status
// @route   PUT /api/requests/:id
// @access  Private (Admin Only)
const updateRequestStatus = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            res.status(401);
            throw new Error('User not authorized - Admin only');
        }

        const { status } = req.body;
        const request = await ServiceRequest.findById(req.params.id);

        if (!request) {
            res.status(404);
            throw new Error('Request not found');
        }

        request.status = status;
        const updatedRequest = await request.save();
        res.status(200).json(updatedRequest);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    createRequest,
    getRequests,
    getRequestsByStudentId,
    updateRequestStatus
};
