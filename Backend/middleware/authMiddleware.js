const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(401).json({ message: 'Not authorized, token failed' });
      } else {
        
        const userId = decoded.id;

        const user = await User.findById(userId);
        
        if (!user) {
          return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        req.user = user;

        next();
      }
    });
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
