const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController')
const LeaveRequest = require('../models/LeaveRequest');

router.get('/leave-requests',authMiddleware.authMiddleware,adminController.getLeaveRequests);
router.put('/leave-requests/:id/approve',authMiddleware.authMiddleware,adminController.approveLeaveRequest);
router.put('/leave-requests/:id/reject',authMiddleware.authMiddleware,adminController.rejectLeaveRequest);

module.exports = router;