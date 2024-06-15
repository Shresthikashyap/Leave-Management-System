const express = require('express');
const leaveRequestController = require('../controllers/leaveController')
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/fetch-requests',authMiddleware.authMiddleware,leaveRequestController.getLeaveStatus);
router.post('/post-request', authMiddleware.authMiddleware,leaveRequestController.requestLeave);

module.exports = router;
