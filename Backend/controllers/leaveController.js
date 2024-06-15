const LeaveRequest = require('../models/LeaveRequest');

exports.requestLeave = async (req, res) => {
    console.log(req.body)
  const { leaveType, startDate, endDate } = req.body;
  console.log(req.user)
  
  try {
    const leaveRequest = new LeaveRequest({leaveType, startDate, endDate, userId: req.user._id });

    await leaveRequest.save();
    res.status(201).json(leaveRequest); 
  } catch (error) {
    console.error('Error requesting leave:', error);
    res.status(400).send('Error requesting leave');
  }
};

exports.getLeaveStatus = async (req, res) => {
  try {
    console.log(req.user._id)
    const leaves = await LeaveRequest.find({ userId: req.user._id });
    console.log(leaves)
    res.json(leaves);
  } catch (error) {
    res.status(500).send(error);
  }
};
