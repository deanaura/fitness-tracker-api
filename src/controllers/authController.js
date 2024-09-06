const User = require('../models/userModel');
const { handleError } = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');

class AuthController {
  // register 
  async register(req, res) {
    try {
      const { username, password, role } = req.body;
      const newUser = new User({ username, password, role });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }

  // login user
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = user.generateAuthToken();
      res.status(200).json({ token });
    } catch (error) {
      handleError(res, error);
    }
  }

  // middleware untuk cek jika user = admin
  isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  }

  // get all users (admin only)
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      handleError(res, error);
    }
  }

  // delete user berdasarkan ID (admin only)
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }

  // middleware untuk authenticate user
  authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Invalid token' });
      console.log(decoded); 
      req.user = decoded;
      next();
    });
  }  
}

module.exports = new AuthController();
