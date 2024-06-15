const LeaveRequest = require('../models/LeaveRequest');

exports.approveLeaveRequest = async (req, res) => {
  console.log(req)
    const { id } = req.params;
  
    try {
      const leaveRequest = await LeaveRequest.findById(id);
      if (!leaveRequest) {
        return res.status(404).send('Leave request not found');
      }
  
      leaveRequest.status = 'approved';
      await leaveRequest.save();
      res.send('Leave request approved');
    } catch (error) {
      console.error('Error approving leave request:', error);
      res.status(400).send(error);
    }
  };

  exports.rejectLeaveRequest = async (req, res) => {
    console.log(req)
      const { id } = req.params;
    
      try {
        const leaveRequest = await LeaveRequest.findById(id);
        if (!leaveRequest) {
          return res.status(404).send('Leave request not found');
        }
    
        leaveRequest.status = 'rejected';
        await leaveRequest.save();
        res.send('Leave request rejected');
      } catch (error) {
        console.error('Error approving leave request:', error);
        res.status(400).send(error);
      }
    };

exports.getLeaveRequests = async (req, res) => {
    try {
      const leaveRequests = await LeaveRequest.find().populate('userId', 'email');
      res.json(leaveRequests);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  