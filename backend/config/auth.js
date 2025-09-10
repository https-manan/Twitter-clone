const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;  
    if (!token) {
      return res.status(401).json({
        success: false,
        msg: 'No token found.'
      });
    }

    const authUser = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = authUser.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, msg: 'Invalid token' });
  }
};

module.exports = isAuthenticated;
