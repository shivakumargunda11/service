const express = require('express');
const router = express.Router();
const {
    createRequest,
    getRequests,
    getRequestsByStudentId,
    updateRequestStatus,
} = require('../controllers/requestController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createRequest);
router.get('/', protect, getRequests);
router.get('/:studentId', protect, getRequestsByStudentId);
router.put('/:id', protect, updateRequestStatus);

module.exports = router;
