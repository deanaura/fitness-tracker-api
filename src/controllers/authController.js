const User = require('../models/userModel');
const { handleError } = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');

class AuthController {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const user = new User({ username, password });
      await user.save();
      res.status(201).json({ message: 'User registered' });
    } catch (error) {
      handleError(res, error);
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      handleError(res, error);
    }
  }

  // middleware to protect routes
  async authenticate(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'Unauthorized' });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      handleError(res, error);
    }
  }
}

module.exports = new AuthController();
